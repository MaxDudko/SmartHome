import nodemailer from 'nodemailer'
import passport from 'passport'
import randomstring from 'randomstring'
import PasswordToken from '../models/PasswordToken'
import User from '../models/User'

class UserServices {
  private static validateEmail(email: string) {
    return (
      email.match(/^([a-zA-Z0-9._-]+@[a-zA-Z]+.[a-zA-Z]{2,4})$/) &&
      email.length > 5 &&
      email.length < 64
    )
  }

  private static validatePassword(password: string) {
    return password.match(/^(?=.*[A-Za-z0-9])(?=.*\d)[A-Za-z0-9\d]{8,64}$/)
  }

  public async userPassport(email: string, password: string, done: any) {
    const user = await User.findOne({ where: { email } })
    if (!user || !user.validatePassword(password)) {
      return done(null, false, {
        errors: {
          'login or password': 'not valid',
        },
      })
    }

    return done(null, user)
  }

  public async createUser(email: string, password: string, fullName: string) {
    if (UserServices.validateEmail(email) && UserServices.validatePassword(password)) {
      const isUserRegister = await User.findOne({ where: { email } })
      if (isUserRegister) {
        throw Error('Email is exists')
      }
      const user = new User({ email, fullName })
      user.setPassword(password)

      return User.create(user.getAttributes())
    }

    throw Error('Email or password not valid')
  }

  public authenticateUser(email: string, password: string) {
    if (email && password) {
      return passport.authenticate('local', (err, passportUser) => {
        if (err) {
          throw Error(err)
        }

        if (passportUser) {
          const user = passportUser
          user.token = passportUser.generateJWT()

          return user.toAuthJSON()
        }
      })
    }

    throw Error('Email or password not valid')
  }

  public async checkToken(email: string) {
    const user = await User.findOne({ where: { email } })
    if (!user) {
      throw Error('User not found')
    }

    return user.toAuthJSON()
  }

  public async resetPassword(email: string) {
    const user = await User.findOne({ where: { email } })

    if (!user) {
      throw Error('Email not found')
    }

    const token = randomstring.generate(32)
    const url = `http://${process.env.HOST}:${process.env.PORT}/password/reset?token=${token}`

    const passwordToken = new PasswordToken({ userId: user.id, token })

    await PasswordToken.create(passwordToken.getAttributes())

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    })

    transporter.sendMail(
      {
        from: process.env.EMAIL,
        to: user.email,
        subject: 'SmartHome: reset password',
        html: `<p>Please click on this link:</p><p>${url}</p>`,
      },
      (error, info) => {
        if (error) {
          // tslint:disable-next-line:no-console
          console.log(error)
        } else {
          // tslint:disable-next-line:no-console
          console.log('Email sent: ' + info.response)
        }
      }
    )
  }

  public async checkPasswordToken(token: any) {
    const passwordToken = await PasswordToken.findOne({ where: { token } })

    if (!passwordToken) {
      throw Error('Wrong token')
    }

    const tokenValid = passwordToken.validateTime()

    if (!tokenValid) {
      throw Error('Token not valid')
    }

    return tokenValid
  }

  public async refreshPassword(password: string, token: string) {
    const passwordToken = await PasswordToken.findOne({ where: { token } })
    const userId = passwordToken.getAttributes().userId

    if (!passwordToken || !passwordToken.validateTime()) {
      throw Error('Token not valid')
    }

    if (userId) {
      const user = User.findOne({ where: { id: userId } })
      if (!user) {
        throw Error('User not found')
      }
    // update user password...
    }
  }
}

export default UserServices
