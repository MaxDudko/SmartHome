import { Request } from 'express'
import jwt from 'express-jwt'

const getToken = (req: Request): string | undefined => req.body.token

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
