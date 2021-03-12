import { Request, Response } from 'express'
import { RequestWithPayload } from '../middlewares/auth'
import HomeServices from '../services/homeServices'
import SmartAppServices from '../services/smartAppServices'

const services = new HomeServices()

class HomeController {
  public async findHomeList(req: RequestWithPayload, res: Response) {
    const userId = req.payload?.id

    if (userId) {
      try {
        const homeList = await services.findHomeList(userId)
        return res.status(200).json({ homeList })
      } catch (e) {
        return res.status(400).send({ message: e.message })
      }
    }
  }

  public async selectHome(req: RequestWithPayload, res: Response) {
    const { homeId } = req.body
    const userId = req.payload?.id

    if (userId) {
      try {
        const resData = await services.selectHome(userId, homeId)
        return res.status(200).json({ ...resData })
      } catch (e) {
        return res.status(400).send({ message: e.message })
      }
    }
  }

  public async createHome(req: RequestWithPayload, res: Response) {
    const { homeName, homeAddress, key } = req.body
    const userId = req.payload?.id

    if (userId) {
      try {
        await services.createHome(userId, homeName, homeAddress, key)

        const url = new SmartAppServices().generateUrl()
        return res.status(200).send({ url })
      } catch (e) {
        return res.status(400).send({ message: e.message })
      }
    }
  }

  public async addResident(req: RequestWithPayload, res: Response) {
    const { homeId, key } = req.body
    const userId = req.payload?.id

    if (userId) {
      try {
        const resData = await services.addResident(userId, homeId, key)
        return res.status(200).json({ ...resData })
      } catch (e) {
        return res.status(400).send({ message: e.message })
      }
    }
  }
}

export default HomeController
