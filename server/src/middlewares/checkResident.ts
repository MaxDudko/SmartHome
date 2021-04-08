import { NextFunction, Request, Response } from 'express'
import Resident from '../models/Resident'

const checkResident = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.body.id
  const homeId = req.query.homeId || req.body.homeId
  const resident = await Resident.findOne({ where: { userId, homeId } })
  if (!resident) {
    return res.status(401).send('access denied')
  }

  return next()
}

export default checkResident
