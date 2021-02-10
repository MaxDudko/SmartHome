import { Request, Response } from 'express'
import HomeServices from '../services/homeServices'

const services = new HomeServices()

class HomeController {
  public async findHomeList(req: Request, res: Response) {
    const { userId } = req.body

    if (userId) {
      try {
        const homeList = await services.findHomeList(userId)
        return res.status(200).json({ homeList })
      } catch (e) {
        return res.status(400).json({ error: e.message })
      }
    } else {
      return res.status(400).send('User ID are ' + typeof userId)
    }
  }

  public async selectHome(req: Request, res: Response) {
    const { userId, homeId } = req.body

    if (userId && homeId) {
      try {
        const resData = await services.selectHome(userId, homeId)
        return res.status(200).json({ ...resData })
      } catch (e) {
        return res.status(400).json({ error: e.message })
      }
    } else {
      return res.status(400).send('All fields are Required')
    }
  }

  public async createHome(req: Request, res: Response) {
    const { userId, homeName, homeAddress, key } = req.body

    if (userId && homeName && homeAddress && key) {
      try {
        const resData = await services.createHome(userId, homeName, homeAddress, key)
        return res.status(200).json({ ...resData })
      } catch (e) {
        return res.status(400).json({ error: e.message })
      }
    } else {
      return res.status(400).send('All fields are Required')
    }
  }

  public async addResident(req: Request, res: Response) {
    const { userId, homeId, key } = req.body

    if (userId && homeId && key) {
      try {
        const resData = await services.addResident(userId, homeId, key)
        return res.status(200).json({ ...resData })
      } catch (e) {
        return res.status(400).json({ error: e.message })
      }
    } else {
      return res.status(400).send('All fields are Required')
    }
  }
}

export default HomeController
