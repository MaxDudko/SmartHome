import bodyParser from 'body-parser'
import cors from 'cors'
import express, { NextFunction, Request, Response } from 'express'
import { ValidationError } from 'express-validation'
import morgan from 'morgan'
import passport from 'passport'
import DB from './config/db.config'
import logger from './config/logger.config'
import strategy from './config/passport'
import router from './router'

class Server {
  constructor() {
    this.app = express()
    this.config()
    this.dbConnect()
    Server.passport()
  }

  private app

  private config() {
    this.app.use(bodyParser.urlencoded({ extended: true }))
    this.app.use(bodyParser.json({ limit: '1mb' }))
    this.app.use(morgan('dev'))
    this.app.use(cors())
    this.app.use(process.env.API_PREFIX || '/api/v1', router)
    this.app.use((err: { statusCode: number }, req: Request, res: Response, next: NextFunction) => {
      if (err instanceof ValidationError) {
        return res.status(err.statusCode).json(err)
      }
      return res.status(500).json(err)
    })
  }

  private static passport() {
    passport.use(strategy)
  }

  private dbConnect() {
    DB.sequelize
      .sync()
      .then(() => {
        logger.info('Connection has been established successfully.')
      })
      .catch((err) => {
        logger.error('Unable to connect to the database:', err)
      })
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
}

export default Server
