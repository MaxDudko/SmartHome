import axios from 'axios'
import * as querystring from 'querystring'
import randomstring from 'randomstring'
import { getTokenEndpoint, getTokenParams } from '../config/smartApp.config'
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
    const token = await axios
      .post(url, querystring.stringify({ ...getTokenParams, code }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .then((res) => res.data.access_token)
      .catch((err) => console.log(err))

    emitter.emit('token', token)
  }

  public async validateToken(token: string) {
    const apiToken = await SmartAppToken.findOne({ where: { token } })

    if (apiToken) {
      await apiToken.destroy()

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
    const SMART_APP_API_URL = process.env.SMART_APP_API_URL
    const API_TOKEN = process.env.API_TOKEN
    const responseToken = homeId && (await SmartAppServices.setToken(homeId))

    if (!SMART_APP_API_URL || !API_TOKEN || !responseToken) {
      throw Error('API credentials not found')
    }

    const requestToSmartThings = await axios({
      method: 'post',
      url: `${SMART_APP_API_URL}/lock-toggle`,
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
      data: { token: responseToken },
    })

    return requestToSmartThings.data
  }
}

export default SmartAppServices
