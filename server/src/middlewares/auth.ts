import { Request } from 'express'
import jwt from 'express-jwt'

const getToken = (req: Request): string | null => {
  const {
    body: { token },
  } = req

  if (token) {
    return token
  }

  return null
}

const auth = {
  required: jwt({
    algorithms: ['HS256'],
    secret: process.env.JWT_SECRET as string,
    userProperty: 'payload',
    getToken,
  }),
  optional: jwt({
    algorithms: ['HS256'],
    secret: process.env.JWT_SECRET as string,
    userProperty: 'payload',
    getToken,
    credentialsRequired: false,
  }),
}

export default auth
