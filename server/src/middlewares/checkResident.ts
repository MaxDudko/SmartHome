import { NextFunction, Request, Response } from 'express'
import Resident from '../models/Resident'
import { RequestWithPayload } from './auth'

const checkResident = async (req: RequestWithPayload, res: Response, next: NextFunction) => {
  const userId = req.jwt?.id
  const homeId = req.query.homeId || req.body.homeId
  const resident = await Resident.findOne({ where: { userId, homeId } })
  if (!resident) {
    return res.status(401).send('access denied')
  }

  return next()
}

export default checkResident
