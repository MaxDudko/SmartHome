import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../config/db.config'

interface PasswordTokenAttributes {
  userId: string
  token: string
  createdAt?: any
}

class PasswordToken extends Model<PasswordTokenAttributes> implements PasswordTokenAttributes {
  public userId!: string
  public token!: string
  public createdAt!: any
  public getAttributes!: Function

  public validateTime(): boolean {
    const term = 600000
    const created = this.createdAt.getTime()
    const now = new Date().getTime()

    return now - created <= term
  }
}

PasswordToken.init(
  {
    userId: DataTypes.STRING,
    token: DataTypes.STRING,
    createdAt: DataTypes.DATE,
  },
  {
    getterMethods: {
      getAttributes() {
        return {
          userId: this.userId,
          token: this.token,
          createdAt: this.createdAt,
        }
      },
    },
    sequelize,
    freezeTableName: process.env.NODE_ENV === 'test',
  }
)

export default PasswordToken
