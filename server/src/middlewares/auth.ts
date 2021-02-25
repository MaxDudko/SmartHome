import { Request } from 'express'
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

const auth = {
  required: jwt({
    algorithms: ['HS256'],
    secret: (process.env.JWT_SECRET as string) || 'secret',
    userProperty: 'payload',
    getTokenFromHeaders,
  }),
  optional: jwt({
    algorithms: ['HS256'],
    secret: (process.env.JWT_SECRET as string) || 'secret',
    userProperty: 'payload',
    getTokenFromHeaders,
    credentialsRequired: false,
  }),
}

export default auth
