import crypto from 'crypto'
import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../config/db.config'

interface HomeAttributes {
  id?: string
  name: string
  address: string
  salt?: string
  hash?: string
}

class Home extends Model<HomeAttributes> implements HomeAttributes {
  public id!: string
  public name!: string
  public address!: string
  public salt!: string
  public hash!: string

  public getAttributes() {
    return {
      id: this.id.toString(),
      name: this.name,
      address: this.address,
    }
  }
  public setPassword(password: string): void {
    this.salt = crypto.randomBytes(16).toString('hex')
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex')
  }

  public validatePassword(password: string): boolean {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex')
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
  },
  { sequelize, freezeTableName: process.env.NODE_ENV === 'test' }
)

export default Home
