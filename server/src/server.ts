import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import passport from 'passport'
import DB from './config/db.config'
import strategy from './config/passport'
import authMiddleware from './middlewares/auth'
import router from './router'

class Server {
  private static passport() {
    passport.use(strategy)
  }
  private app

  constructor() {
    this.app = express()
    this.config()
    this.dbConnect()
    Server.passport()
  }

  public start = (port: number) => {
    return new Promise((resolve, reject) => {
      this.app
        .listen(port, () => {
          resolve(port)
        })
        .on('error', (err: Error) => reject(err))
    })
  }

  private config() {
    this.app.use(bodyParser.urlencoded({ extended: true }))
    this.app.use(bodyParser.json({ limit: '1mb' }))
    this.app.use(cors())
    this.app.use(router)
  }

  private dbConnect() {
    DB.sequelize
      .sync()
      .then(() => {
        // tslint:disable-next-line:no-console
        console.log('DB: Connection has been established successfully.')
      })
      .catch((err) => {
        // tslint:disable-next-line:no-console
        console.error('DB: Unable to connect to the database:', err)
      })
  }
}

export default Server
