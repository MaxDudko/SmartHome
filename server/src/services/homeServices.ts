import { EventEmitter } from 'events'
import Home from '../models/Home'
import Resident from '../models/Resident'
import User from '../models/User'
import { sse } from '../router'

export const emitter = new EventEmitter()

class HomeServices {
  private static validateField(field: string) {
    return field.match(/^[A-Za-z_][A-Za-z0-9_]{3,32}$/)
  }

  private static validateKey(key: string) {
    return key.match(/^(?=.*[A-Za-z0-9])(?=.*\d)[A-Za-z0-9\d]{8,32}$/)
  }

  public async findHomeList(userId: string) {
    const residents = await Resident.findAll({ where: { userId } })

    if (residents) {
      return await Promise.all(
        residents.map(async (doc) => {
          const home = await Home.findOne({ where: { id: doc.getDataValue('homeId') } })
          return {
            ...home?.getAttributes(),
            role: doc.getDataValue('role'),
          }
        })
      )
    }
  }

  public async selectHome(userId: string, homeId: string) {
    const resident = await Resident.findOne({ where: { userId, homeId } })

    if (resident) {
      const home = await Home.findOne({ where: { id: homeId } })

      if (home) {
        return {
          ...home.getAttributes(),
          role: resident.getAttributes().role,
        }
      }
      throw Error('Home not found')
    }
    throw Error('User not resident in this Home')
  }

  public async createHome(userId: string, homeName: string, homeAddress: string, key: string) {
    if (!HomeServices.validateField(homeName)) {
      throw Error('Home name not valid')
    }
    if (!HomeServices.validateField(homeAddress)) {
      throw Error('Home address not valid')
    }
    if (!HomeServices.validateKey(key)) {
      throw Error('Security key must be at least 8-64 A-Z, a-z, 0-9')
    }

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
      role: 'admin',
    })

    emitter.on('smartAppData', (token: any, tokenExpires: any, endpoints: any) => {
      Home.update({ token, tokenExpires, endpoints }, { where: { id: home.id } })
      console.log('event: ', token, tokenExpires, endpoints)

      sse.send(
        {
          ...home.getAttributes(),
          role: resident.getAttributes().role,
        },
        'home'
      )
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
          role: 'user',
        })
        return {
          ...home.getAttributes(),
          role: resident.getAttributes().role,
        }
      }
      throw Error('Wrong Key')
    }
    throw Error('User or Home not found')
  }
}

export default HomeServices
