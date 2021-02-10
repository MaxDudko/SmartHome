import { Sequelize } from 'sequelize'
import Home from './Home'
import Lock from './Lock'
import Resident from './Resident'
import User from './User'

const DB_NAME =
  process.env.NODE_ENV === 'test'
    ? (process.env.DB_NAME_TEST as string)
    : (process.env.DB_NAME as string)
export const sequelize = new Sequelize(
  DB_NAME,
  process.env.DB_USER as string,
  process.env.DB_PASSWORD as string,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
)

const DB = {
  Sequelize,
  sequelize,
  user: User.sync(),
  home: Home.sync(),
  resident: Resident.sync(),
  lock: Lock.sync(),
}

export default DB
