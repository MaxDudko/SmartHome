import axios, { AxiosResponse } from 'axios'
import * as querystring from 'querystring'
import { EVENT_DEVICES } from '../config/constants'
import {
  getCodeEndpoint,
  getCodeParams,
  getTokenEndpoint,
  getTokenParams,
} from '../config/smartApp.config'
import Device from '../models/Device'
import Home from '../models/Home'
import Resident from '../models/Resident'
import { sse } from '../router'
import { emitter } from './homeServices'

class SmartAppServices {
  public callAPI(method: any, url: string, token: string, data?: object) {
    return axios({
      method,
      url,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { data },
    })
  }

  public async sendDevices(devices: any, homeId: string) {
    const residents = await Resident.findAll({ where: { homeId } })
    residents.map((resident) => {
      sse.send({ event: EVENT_DEVICES, data: devices, id: resident.userId })
    })
  }

  public generateUrl() {
    const url = `${process.env.SMART_APP_API_URL}${getCodeEndpoint}`
    const { response_type, client_id, scope, redirect_uri } = getCodeParams
    const query = `response_type=${response_type}&client_id=${client_id}&scope=${scope}&redirect_uri=${redirect_uri}`

    return `${url}?${query}`
  }

  public async accessToken(code: any) {
    const url = `${process.env.SMART_APP_API_URL}${getTokenEndpoint}`
    const credentials = await axios.post(url, querystring.stringify({ ...getTokenParams, code }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })

    const { access_token, expires_in } = credentials.data

    if (access_token) {
      const endpoints = await this.callAPI(
        'GET',
        `${process.env.SMART_APP_API_URL}/api/smartapps/endpoints`,
        access_token
      )

      if (endpoints) {
        emitter.emit('smartAppData', access_token, expires_in, endpoints.data)
      }
    }
  }

  public async validateToken(token: any, homeId: string) {
    const home = await Home.findOne({ where: { id: homeId } })

    if (home && token === home.token) {
      return true
    }

    throw Error('token not valid')
  }

  public async addDevices(homeId: string) {
    const home = await Home.findOne({ where: { id: homeId } })

    if (!home) {
      throw Error('Home not found')
    }

    const devices = await this.callAPI(
      'GET',
      `${process.env.SMART_APP_API_URL}/api/smartapps/installations/${process.env.API_ID}/get-devices`,
      home.token
    ).then((res: AxiosResponse) => res.data)

    const types = Object.keys(devices)

    types.map((type: string) => {
      devices[type].map(async (device: any) => {
        const newDevice = new Device({
          ...device,
          homeId,
          location: 'home',
          active: false,
        })

        await Device.create(newDevice.getAttributesAndCreate)
      })
    })
  }

  public async getDevices(homeId: any, activeOnly: boolean) {
    const list = activeOnly
      ? await Device.findAll({ where: { homeId, active: true } })
      : await Device.findAll({ where: { homeId } })
    return list.map((lock: any) => lock.getAttributes)
  }

  public activateDevices(homeId: any, devices: any) {
    devices.map(async (deviceId: string) => {
      await Device.update({ active: true }, { where: { homeId, deviceId } })
    })
  }

  public async updateState(state: any, homeId: string) {
    const types = Object.keys(state)
    types.forEach((type: string) => {
      state[type].map(async (device: any) => {
        const { value, deviceId } = device
        await Device.update({ value }, { where: { deviceId, homeId }, returning: true })
      })
    })
  }

  public async lockToggle(homeId: string) {
    const home = await Home.findOne({ where: { id: homeId } })

    if (home) {
      return this.callAPI(
        'POST',
        `${process.env.SMART_APP_API_URL}/api/smartapps/installations/${process.env.API_ID}/lock-toggle`,
        home.token,
        { token: home.token, homeId: home.id.toString() }
      )
    }
  }
}

export default SmartAppServices
