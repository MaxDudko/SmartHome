import axios from 'axios'
import * as querystring from 'querystring'
import randomstring from 'randomstring'
import { getTokenEndpoint, getTokenParams } from '../config/smartApp.config'
import Home from '../models/Home'
import Lock from '../models/Lock'
import SmartAppToken from '../models/SmartAppToken'
import { emitter } from './homeServices'

class SmartAppServices {
  private static async setToken(homeId: string) {
    const token = randomstring.generate(32)

    const apiToken = new SmartAppToken({ homeId, token })
    await SmartAppToken.create(apiToken.getAttributes())

    return apiToken.token
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
      const endpoints = await axios({
        method: 'get',
        url: `${process.env.SMART_APP_API_URL}/api/smartapps/endpoints`,
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })

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

  public async getDevices(homeId: string) {
    const list = await Lock.findAll({ where: { homeId } })
    const locks = list.map((lock: any) => lock.getAttributes())

    return {
      locks,
    }
  }

  public async updateState(state: any) {
    const { type, value, id } = state[0]

    if (type === 'lock') {
      const lock = await Lock.update({ value }, { where: { deviceId: id }, returning: true })

      return lock[1][0].getAttributes()
    }
  }

  public async lockToggle(homeId: string) {
    const home = await Home.findOne({ where: { id: homeId } })

    if (home) {
      return axios({
        method: 'post',
        url: `${process.env.SMART_APP_API_URL}/api/smartapps/installations/3fd57648-2aa5-4cd3-b4ff-d8b1fc786a27/lock-toggle`,
        headers: {
          Authorization: `Bearer ${home.token}`,
        },
        data: { token: home.token, homeId: home.id.toString() },
      })
    }
  }
}

export default SmartAppServices
