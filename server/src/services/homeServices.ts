import { EventEmitter } from 'events'
import {
  EVENT_DEVICES,
  EVENT_HOME,
  EVENT_SMART_APP_DATA,
  ROLE_ADMIN,
  ROLE_USER,
} from '../config/constants'
import logger from '../config/logger.config'
import Home from '../models/Home'
import Resident from '../models/Resident'
import User from '../models/User'
import { sse } from '../router'
import SmartAppServices from './smartAppServices'

export const emitter = new EventEmitter()

class HomeServices {
  public async findHomeList(userId: string) {
    const residents = await Resident.findAll({ where: { userId } })

    if (residents) {
      return await Promise.all(
        residents.map(async (doc) => {
          const home = await Home.findOne({ where: { id: doc.getDataValue('homeId') } })
          return {
            ...home?.getAttributes,
            role: doc.getDataValue('role'),
          }
        })
      )
    }
  }

  public async selectHome(userId: string, homeId: any) {
    const resident = await Resident.findOne({ where: { userId, homeId } })

    if (resident) {
      const home = await Home.findOne({ where: { id: homeId } })

      if (home) {
        return {
          ...home.getAttributes,
          role: resident.getAttributes.role,
        }
      }
      throw Error('Home not found')
    }
    throw Error('User not resident in this Home')
  }

  public async createHome(userId: string, homeName: string, homeAddress: string, key: string) {
    const user = await User.findOne({ where: { id: userId } })
    if (!user) {
      throw Error('User not found')
    }

    const newHome = new Home({
      name: homeName,
      address: homeAddress,
    })

    newHome.setPassword(key)

    const home = await Home.create(newHome.get())

    const resident = await Resident.create({
      userId,
      homeId: home.id,
      role: ROLE_ADMIN,
    })

    emitter.on(EVENT_SMART_APP_DATA, async (token: any, tokenExpires: any, endpoints: any) => {
      await Home.update({ token, tokenExpires, endpoints }, { where: { id: home.id } })
      logger.info('event: ', token, tokenExpires, endpoints)

      await new SmartAppServices().addDevices(home.id.toString())
      const devices = await new SmartAppServices().getDevices(home.id.toString(), true)

      sse.send({
        event: EVENT_HOME,
        data: {
          ...home.getAttributes,
          role: resident.getAttributes.role,
        },
        id: resident.userId,
      })

      sse.send({ event: EVENT_DEVICES, data: devices, id: resident.userId })
    })
  }

  public async addResident(userId: string, homeId: string, key: string) {
    const alreadyResident = await Resident.findOne({ where: { userId, homeId } })
    if (alreadyResident) {
      throw Error('User already resident in this home')
    }

    const user = await User.findOne({ where: { id: userId } })
    const home = await Home.findOne({ where: { id: homeId } })

    if (user && home) {
      const passValid = home.validatePassword(key)
      if (passValid) {
        const resident = await Resident.create({
          userId,
          homeId: home.id,
          role: ROLE_USER,
        })
        return {
          ...home.getAttributes,
          role: resident.getAttributes.role,
        }
      }
      throw Error('Wrong Key')
    }
    throw Error('User or Home not found')
  }
}

export default HomeServices
