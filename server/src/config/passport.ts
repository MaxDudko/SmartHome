import { Strategy as LocalStrategy } from 'passport-local'
import UserServices from '../services/userServices'
const services = new UserServices()

const strategy = new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  (email: string, password: string, done: any) => {
    try {
      return services.userPassport(email, password, done)
    } catch (error) {
      done(error)
    }
  }
)

export default strategy
