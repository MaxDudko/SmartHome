import { Request, Response } from 'express'
import { getCodeEndpoint, getCodeParams } from '../config/smartApp.config'
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
        return res.status(400).send({ message: e.message })
      }
    } else {
      return res.status(400).send({ message: 'User ID are ' + typeof userId })
    }
  }

  public async selectHome(req: Request, res: Response) {
    const { userId, homeId } = req.body

    if (userId && homeId) {
      try {
        const resData = await services.selectHome(userId, homeId)
        return res.status(200).json({ ...resData })
      } catch (e) {
        return res.status(400).send({ message: e.message })
      }
    } else {
      return res.status(400).send({ message: 'All fields are Required' })
    }
  }

  public async createHome(req: Request, res: Response) {
    const { userId, homeName, homeAddress, key } = req.body

    if (userId && homeName && homeAddress && key) {
      try {
        await services.createHome(userId, homeName, homeAddress, key)

        const url = `${process.env.SMART_APP_API_URL}${getCodeEndpoint}`
        const { response_type, client_id, scope, redirect_uri } = getCodeParams
        const query = `response_type=${response_type}&client_id=${client_id}&scope=${scope}&redirect_uri=${redirect_uri}`

        return res.status(200).send({ url: `${url}?${query}` })
      } catch (e) {
        return res.status(400).send({ message: e.message })
      }
    } else {
      return res.status(400).send({ message: 'All fields are Required' })
    }
  }

  public async addResident(req: Request, res: Response) {
    const { userId, homeId, key } = req.body

    if (userId && homeId && key) {
      try {
        const resData = await services.addResident(userId, homeId, key)
        return res.status(200).json({ ...resData })
      } catch (e) {
        return res.status(400).send({ message: e.message })
      }
    } else {
      return res.status(400).send({ message: 'All fields are Required' })
    }
  }
}

export default HomeController
