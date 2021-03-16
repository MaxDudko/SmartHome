import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../config/db.config'

interface UserAttributes {
  id?: any
  email: string
  salt?: string
  hash?: string
  fullName: string
}

class User extends Model<UserAttributes> implements UserAttributes {
  public id!: string
  public email!: string
  public salt!: string
  public hash!: string
  public fullName!: string
  public getAttributes!: Function

  public setPassword(password: string): void {
    this.salt = crypto.randomBytes(16).toString('hex')
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex')
  }

  public validatePassword(password: string): boolean {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex')
    return this.hash === hash
  }

  public generateJWT(): string {
    const today = new Date()
    const expirationDate = new Date(today)
    expirationDate.setDate(today.getDate() + 60)

    return jwt.sign(
      {
        id: this.id.toString(),
        email: this.email,
        exp: parseInt(String(expirationDate.getTime() / 1000), 10),
      },
      (process.env.JWT_SECRET as string) || 'secret'
    )
  }

  public toAuthJSON(): { [key: string]: string | number } {
    return {
      id: this.id,
      email: this.email,
      token: this.generateJWT(),
      fullName: this.fullName,
    }
  }
}

User.init(
  {
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    salt: DataTypes.STRING,
    hash: DataTypes.TEXT,
    fullName: DataTypes.STRING,
  },
  {
    getterMethods: {
      getAttributes() {
        return {
          id: this.id,
          email: this.email,
          fullName: this.fullName,
        }
      },
    },
    sequelize,
    freezeTableName: process.env.NODE_ENV === 'test',
  }
)

export default User
