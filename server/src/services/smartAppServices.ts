import axios from 'axios'
import Lock from '../models/Lock'

class SmartAppServices {
  public async getDevices(homeId: string) {
    if (homeId) {
      const list = await Lock.findAll({ where: { homeId } })
      const locks = list.map((lock: any) => lock.getAttributes())

      return {
        locks,
      }
    }
  }

  public async updateState(state: any) {
    const { type, value, id } = state[0]

    if (type === 'lock') {
      const lock = await Lock.update({ value }, { where: { deviceId: id }, returning: true })

      return lock[1][0].getAttributes()
    }
  }

  public async lockToggle(token: string) {
    const SMART_APP_API_URL = process.env.SMART_APP_API_URL
    const API_TOKEN = process.env.API_TOKEN

    if (!SMART_APP_API_URL || !API_TOKEN) {
      throw Error('API credentials not found')
    }

    const requestToSmartThings = await axios({
      method: 'post',
      url: `${SMART_APP_API_URL}/lock-toggle`,
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
      data: { user_token: token },
    })

    return requestToSmartThings.data
  }
}

export default SmartAppServices
