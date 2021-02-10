import Home from '../models/Home'
import Lock from '../models/Lock'
import SmartAppServices from '../services/smartAppServices'

const services = new SmartAppServices()

const syncAll = async () => {
  await Home.sync({ force: true })
  await Lock.sync({ force: true })
}
const dropAll = async () => {
  await Home.drop()
  await Lock.drop()
}

const createLock = async (
  homeId: string,
  deviceId: string,
  type: string,
  label: string,
  location: string,
  value: string,
  battery: number
) => {
  const lock = new Lock({ homeId, deviceId, type, label, location, value, battery })
  return Lock.create(lock.getAttributesAndCreate())
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

      const lock = await createLock(
        home.id.toString(),
        'test-device-id',
        'lock',
        'testLock',
        'test',
        'locked',
        100
      )

      const result = {
        locks: [
          {
            home_id: home.id.toString(),
            device_id: 'test-device-id',
            type: 'lock',
            label: 'testLock',
            location: 'test',
            value: true,
            battery: 100,
            updatedAt: lock.updatedAt,
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
