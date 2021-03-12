import { Request } from 'express'
import jwt from 'express-jwt'

export const getTokenFromHeaders = (req: Request) => {
  const {
    headers: { authorization },
  } = req

  if (authorization && authorization.split(' ')[0] === 'Bearer') {
    return authorization.split(' ')[1]
  }
  return null
}

export interface RequestWithPayload extends Request {
  payload?: {
    id: string
    email: string
    exp: number
    iat: number
  }
}

const options = {
  algorithms: ['HS256'],
  secret: (process.env.JWT_SECRET as string) || 'secret',
  userProperty: 'payload',
  getTokenFromHeaders,
}

const auth = {
  required: jwt(options),
  optional: jwt({
    ...options,
    credentialsRequired: false,
  }),
}

export default auth
