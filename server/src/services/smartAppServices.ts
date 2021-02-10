import axios from 'axios'
import Lock from '../models/Lock'

class SmartAppServices {
  public async getDevices(homeId: string) {
    if (homeId) {
      const locks = await Lock.findAll({ where: { homeId } })

      return {
        locks,
      }
    }
  }

  public async updateState(state: any) {
    const { type, value, deviceId } = state[0]

    if (type === 'lock') {
      const lock = await Lock.update({ value }, { where: { deviceId }, returning: true })

      return lock[1][0].getAttributes()
    }
  }

  public async lockToggle() {
    const requestToSmartThings = await axios({
      method: 'post',
      url:
        'https://graph.api.smartthings.com/api/smartapps/installations/3fd57648-2aa5-4cd3-b4ff-d8b1fc786a27/lock-toggle',
      headers: {
        Authorization: 'Bearer 05e0191a-7eab-4acc-bfce-6c1135144166',
        Cookie:
          '_ga=GA1.2.474585111.1611675801; _hp2_id.2894297474=%7B%22userId%22%3A%228574982205792633%22%2C%22pageviewId%22%3A%225522415491106740%22%2C%22sessionId%22%3A%2215753995686416%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; JSESSIONID=8381FFB273193735C32E6ED0381004C3-n2',
      },
      data: null,
    })

    return requestToSmartThings.data
  }
}

export default SmartAppServices
