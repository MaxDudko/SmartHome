import { Request, Response } from 'express'
import { getTokenFromHeaders } from '../middlewares/auth'
import { sse } from '../router'
import SmartAppServices from '../services/smartAppServices'
const services = new SmartAppServices()

class SmartAppController {
  public async getDevices(req: Request, res: Response) {
    const { homeId } = req.body
    if (homeId) {
      try {
        const devices = await services.getDevices(homeId)

        res.status(200).send(devices)
      } catch (e) {
        return res.status(400).send({ message: e.message })
      }
    }
  }

  public async updateState(req: Request, res: Response) {
    const state = req.body
    const token = getTokenFromHeaders(req)

    if (state && token === process.env.API_TOKEN) {
      try {
        const resp = await services.updateState(state)
        const devices = resp && (await services.getDevices(resp.homeId))

        if (resp && devices) {
          sse.send(devices)
        }

        res.status(200)
      } catch (e) {
        return res.status(400).send({ message: e.message })
      }
    }
  }

  public async lockToggle(req: Request, res: Response) {
    try {
      const lockValue = await services.lockToggle()

      res.status(200).send(lockValue)
    } catch (e) {
      return res.status(400).send({ message: e.message })
    }
  }
}

export default SmartAppController
