import { Sequelize } from 'sequelize'

const DB_NAME =
  process.env.NODE_ENV === 'test'
    ? (process.env.DB_NAME_TEST as string) || 'test'
    : (process.env.DB_NAME as string) || 'smarthome'

export const sequelize = new Sequelize(
  DB_NAME,
  (process.env.DB_USER as string) || 'admin',
  (process.env.DB_PASSWORD as string) || 'admin',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    logging: process.env.NODE_ENV !== 'test',
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
}

export default DB
