import Device from '../models/Device'
import Home from '../models/Home'
import SmartAppServices from '../services/smartAppServices'

jest.mock('../router', () => {
  const mockSSEInstance = { send: jest.fn() }
  const mockSSE = jest.fn(() => mockSSEInstance)
  return { sse: mockSSE }
})

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
  return Device.create(device.getAttributesAndCreate)
}
const createHome = async (name: string, address: string, key: string) => {
  const home = new Home({ name, address })
  await home.setPassword(key)
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

    it('Should return list of active devices for current home:', async () => {
      const home = await createHome('TEST HOME', 'TestTest, 1', 'qwerty123')

      const device1 = await createDevice(
        home.id.toString(),
        'test-device-id-1',
        'lock',
        'testLock',
        'test',
        'locked',
        100,
        true
      )
      const device2 = await createDevice(
        home.id.toString(),
        'test-device-id-2',
        'lock',
        'testLock',
        'test',
        'locked',
        100,
        true
      )
      const device3 = await createDevice(
        home.id.toString(),
        'test-device-id-3',
        'lock',
        'testLock',
        'test',
        'locked',
        100,
        false
      )

      const result = [
        {
          active: true,
          battery: 100,
          deviceId: 'test-device-id-1',
          homeId: '1',
          label: 'testLock',
          location: 'test',
          type: 'lock',
          updatedAt: device1.updatedAt,
          value: true,
        },
        {
          active: true,
          battery: 100,
          deviceId: 'test-device-id-2',
          homeId: '1',
          label: 'testLock',
          location: 'test',
          type: 'lock',
          updatedAt: device2.updatedAt,
          value: true,
        },
      ]

      const data = await services.getDevices(home.id.toString(), true)

      expect(data).toEqual(result)
    })

    it('Should return list of all devices for current home:', async () => {
      const home = await createHome('TEST HOME', 'TestTest, 1', 'qwerty123')

      const device1 = await createDevice(
        home.id.toString(),
        'test-device-id-1',
        'lock',
        'testLock',
        'test',
        'locked',
        100,
        true
      )
      const device2 = await createDevice(
        home.id.toString(),
        'test-device-id-2',
        'lock',
        'testLock',
        'test',
        'locked',
        100,
        true
      )
      const device3 = await createDevice(
        home.id.toString(),
        'test-device-id-3',
        'lock',
        'testLock',
        'test',
        'locked',
        100,
        false
      )

      const result = [
        {
          active: true,
          battery: 100,
          deviceId: 'test-device-id-1',
          homeId: '1',
          label: 'testLock',
          location: 'test',
          type: 'lock',
          updatedAt: device1.updatedAt,
          value: true,
        },
        {
          active: true,
          battery: 100,
          deviceId: 'test-device-id-2',
          homeId: '1',
          label: 'testLock',
          location: 'test',
          type: 'lock',
          updatedAt: device2.updatedAt,
          value: true,
        },
        {
          active: false,
          battery: 100,
          deviceId: 'test-device-id-3',
          homeId: '1',
          label: 'testLock',
          location: 'test',
          type: 'lock',
          updatedAt: device3.updatedAt,
          value: true,
        },
      ]

      const data = await services.getDevices(home.id.toString(), false)

      expect(data).toEqual(result)
    })

    it('Should return empty array because no devices in this home:', async () => {
      const home = await createHome('TEST HOME', 'TestTest, 1', 'qwerty123')

      const data = await services.getDevices(home.id.toString(), true)

      expect(data).toEqual([])
    })

    it('Should send list of devices after state updating:', async () => {
      const home = await createHome('TEST HOME', 'TestTest, 1', 'qwerty123')
      const device = await createDevice(
        home.id.toString(),
        'test-device-id',
        'lock',
        'testLock',
        'test',
        'locked',
        100,
        true
      )

      await services.updateState(
        {
          locks: [
            {
              deviceId: device.deviceId,
              type: device.type,
              label: device.label,
              value: 'unlocked',
              battery: device.battery,
              homeId: home.id,
            },
          ],
        },
        home.id.toString()
      )

      const result = {
        active: true,
        battery: 100,
        deviceId: 'test-device-id',
        homeId: '1',
        label: 'testLock',
        location: 'test',
        type: 'lock',
        updatedAt: device.updatedAt,
        value: false,
      }

      const updatedDevice = await Device.findOne({ where: { deviceId: device.deviceId } })
      expect(updatedDevice?.getAttributes).toEqual(result)
    })
  })
})
