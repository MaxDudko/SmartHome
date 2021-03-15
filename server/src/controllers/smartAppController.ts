import { Request, Response } from 'express'
import { EVENT_DEVICES } from '../config/constants'
import { getTokenFromHeaders } from '../middlewares/auth'
import { sse } from '../router'
import SmartAppServices from '../services/smartAppServices'
const services = new SmartAppServices()

class SmartAppController {
  public async accessToken(req: Request, res: Response) {
    const { code } = req.query

    try {
      await services.accessToken(code)

      res.status(200)
    } catch (e) {
      return res.status(400).send({ message: e.message })
    }
  }

  public async saveToken(req: Request, res: Response) {}

  public async getDevices(req: Request, res: Response) {
    const homeId = req.query.homeId

    try {
      const devices = await services.getDevices(homeId)

      res.status(200).send(devices)
    } catch (e) {
      return res.status(400).send({ message: e.message })
    }
  }

  public async updateState(req: Request, res: Response) {
    const state = req.body
    const token = getTokenFromHeaders(req)

    if (token) {
      const valid = await services.validateToken(token, state[0].homeId)
      if (!valid) {
        return res.status(401)
      }

      try {
        const resp = await services.updateState(state)
        const devices = resp && (await services.getDevices(resp.homeId))

        if (resp && devices) {
          sse.send({ event: EVENT_DEVICES, data: devices })
        }

        res.status(200).send('updated')
      } catch (e) {
        return res.status(400).send({ message: e.message })
      }
    }
  }

  public async lockToggle(req: Request, res: Response) {
    const { homeId } = req.body

    try {
      const lockValue = await services.lockToggle(homeId)

      if (lockValue) {
        res.status(200).send(lockValue.data)
      }
    } catch (e) {
      return res.status(400).send({ message: e.message })
    }
  }
}

export default SmartAppController
