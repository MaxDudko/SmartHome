import { NextFunction, Request, Response } from 'express'
import passport from 'passport'
import UserServices from '../services/userServices'

const services = new UserServices()

interface RequestWithPayload extends Request {
  payload?: { [email: string]: string }
}

class UserController {
  public async createUser(req: Request, res: Response) {
    const { email, password, fullName } = req.body

    try {
      const user = await services.createUser(email, password, fullName)
      return res.status(200).json({ user: user.toAuthJSON() })
    } catch (e) {
      return res.status(400).send({ message: e.message })
    }
  }

  public async authenticateUser(req: Request, res: Response, next: NextFunction) {
    return passport.authenticate('local', { session: false }, (err, passportUser) => {
      if (err) {
        return next(err)
      }

      if (passportUser) {
        const user = passportUser
        user.token = passportUser.generateJWT()

        return res.json({ user: user.toAuthJSON() })
      }

      return res.status(400).send({ message: 'Wrong login or password' })
    })(req, res, next)
  }

  public async checkToken(req: RequestWithPayload, res: Response) {
    const email = req.payload?.email

    if (email) {
      try {
        const user = await services.checkToken(email)
        return res.status(200).json({ user })
      } catch (e) {
        return res.status(404).json({ error: e.message })
      }
    } else {
      return res.status(400).send({ message: 'All fields are Required' })
    }
  }

  public async resetPassword(req: RequestWithPayload, res: Response) {
    const { email } = req.body

    try {
      await services.resetPassword(email)
      return res.status(200).json('Please check your email')
    } catch (e) {
      return res.status(404).json({ error: e.message })
    }
  }

  public async checkPasswordToken(req: RequestWithPayload, res: Response) {
    const token = req.query.token

    try {
      await services.checkPasswordToken(token)
      return res.redirect(`${process.env.CLIENT_URL}/refresh?token=${token}`)
    } catch (e) {
      return res.status(404).json({ error: e.message })
    }
  }

  public async refreshPassword(req: RequestWithPayload, res: Response) {
    const { password, token } = req.body

    try {
      const user = await services.refreshPassword(password, token)
      return res.status(200).json({ user })
    } catch (e) {
      return res.status(404).json({ error: e.message })
    }
  }
}

export default UserController
