import { Request, Response } from 'express'
import HomeServices from '../services/homeServices'
import SmartAppServices from '../services/smartAppServices'

const services = new HomeServices()

class HomeController {
  public async findHomeList(req: Request, res: Response) {
    const { userId } = req.body

    try {
      const homeList = await services.findHomeList(userId)
      return res.status(200).json({ homeList })
    } catch (e) {
      return res.status(400).send({ message: e.message })
    }
  }

  public async selectHome(req: Request, res: Response) {
    const { userId, homeId } = req.body

    try {
      const resData = await services.selectHome(userId, homeId)
      return res.status(200).json({ ...resData })
    } catch (e) {
      return res.status(400).send({ message: e.message })
    }
  }

  public async createHome(req: Request, res: Response) {
    const { userId, homeName, homeAddress, key } = req.body

    try {
      await services.createHome(userId, homeName, homeAddress, key)

      const url = new SmartAppServices().generateUrl()
      return res.status(200).send({ url })
    } catch (e) {
      return res.status(400).send({ message: e.message })
    }
  }

  public async addResident(req: Request, res: Response) {
    const { userId, homeId, key } = req.body

    try {
      const resData = await services.addResident(userId, homeId, key)
      return res.status(200).json({ ...resData })
    } catch (e) {
      return res.status(400).send({ message: e.message })
    }
  }
}

export default HomeController
