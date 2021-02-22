import { NextFunction, Request, Response } from 'express'
import jwt from 'express-jwt'

const getTokenFromHeaders = (req: Request) => {
  const {
    headers: { authorization },
  } = req

  if (authorization && authorization.split(' ')[0] === 'Bearer') {
    return authorization.split(' ')[1]
  }
  return null
}

const authMiddleware = jwt({
  algorithms: ['HS256'],
  secret: process.env.JWT_SECRET as string,
  userProperty: 'payload',
  getTokenFromHeaders,
  credentialsRequired: false,
})

export default authMiddleware
