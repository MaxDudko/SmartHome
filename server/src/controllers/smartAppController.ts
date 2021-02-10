import { Request, Response } from 'express'
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
        return res.status(400).json({ error: e.message })
      }
    }
  }

  public async updateState(req: Request, res: Response) {
    const state = req.body
    if (state) {
      try {
        const resp = await services.updateState(state)
        const devices = resp && (await services.getDevices(resp.home_id))
        resp && devices && sse.send(devices)
        res.status(200).send(resp)
      } catch (e) {
        return res.status(400).json({ error: e.message })
      }
    }
  }

  public async lockToggle(req: Request, res: Response) {
    try {
      const lockValue = await services.lockToggle()
      res.status(200).send(lockValue)
    } catch (e) {
      return res.status(400).json({ error: e.message })
    }
  }
}

export default SmartAppController
