import Device from '../models/Device'
import Home from '../models/Home'
import SmartAppServices from '../services/smartAppServices'

const services = new SmartAppServices()

const syncAll = async () => {
  await Home.sync({ force: true })
  await Device.sync({ force: true })
}
const dropAll = async () => {
  await Home.drop()
  await Device.drop()
}

const createDevice = async (
  homeId: string,
  deviceId: string,
  type: string,
  label: string,
  location: string,
  value: string,
  battery: number,
  active: boolean
) => {
  const device = new Device({ homeId, deviceId, type, label, location, value, battery, active })
  return Device.create(device.getAttributesAndCreate())
}
const createHome = async (name: string, address: string, key: string) => {
  const home = new Home({ name, address })
  home.setPassword(key)
  return Home.create(home.get())
}

describe('SmartAppServices behavior:', () => {
  describe('getDevices():', () => {
    beforeEach(async () => {
      await syncAll()
    })

    afterEach(async () => {
      await dropAll()
    })

    it('Should return list of devices for current home:', async () => {
      const home = await createHome('TEST HOME', 'TestTest, 1', 'qwerty123')

      const devices = await createDevice(
        home.id.toString(),
        'test-device-id',
        'lock',
        'testLock',
        'test',
        'locked',
        100,
        true
      )

      const result = {
        locks: [
          {
            homeId: home.id.toString(),
            deviceId: 'test-device-id',
            type: 'lock',
            label: 'testLock',
            location: 'test',
            value: true,
            battery: 100,
            updatedAt: devices.updatedAt,
            active: true,
          },
        ],
      }

      const data = await services.getDevices(home.id.toString())

      expect(data).toEqual(result)
    })

    it('Should return empty array because no devices in this home:', async () => {
      const home = await createHome('TEST HOME', 'TestTest, 1', 'qwerty123')

      const result = {
        locks: [],
      }

      const data = await services.getDevices(home.id.toString())

      expect(data).toEqual(result)
    })
  })
})
