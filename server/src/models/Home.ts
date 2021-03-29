import crypto from 'crypto'
import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../config/db.config'

interface HomeAttributes {
  id?: string
  name: string
  address: string
  salt?: string
  hash?: string
  token?: string
  tokenExpires?: number
  endpoints?: any
}

class Home extends Model<HomeAttributes> implements HomeAttributes {
  public id!: string
  public name!: string
  public address!: string
  public salt!: string
  public hash!: string
  public token!: string
  public tokenExpires!: number
  public endpoints!: any
  public getAttributes!: Function

  public async setPassword(password: string): Promise<void> {
    this.salt = await crypto.randomBytes(16).toString('hex')
    this.hash = await crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex')
  }

  public async validatePassword(password: string): Promise<boolean> {
    const hash = await crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex')
    return this.hash === hash
  }
}

Home.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    salt: DataTypes.STRING,
    hash: DataTypes.TEXT,
    token: DataTypes.STRING,
    tokenExpires: DataTypes.INTEGER,
    endpoints: DataTypes.JSON,
  },
  {
    getterMethods: {
      getAttributes() {
        return {
          id: this.id,
          name: this.name,
          address: this.address,
        }
      },
    },
    sequelize,
    freezeTableName: process.env.NODE_ENV === 'test',
  }
)

export default Home
