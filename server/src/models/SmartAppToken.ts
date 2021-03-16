import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../config/db.config'

interface SmartAppTokenAttributes {
  homeId: string
  token: string
  createdAt?: any
}

class SmartAppToken extends Model<SmartAppTokenAttributes> implements SmartAppTokenAttributes {
  public homeId!: string
  public token!: string
  public createdAt!: any
  public getAttributes!: Function
}

SmartAppToken.init(
  {
    homeId: DataTypes.STRING,
    token: DataTypes.STRING,
    createdAt: DataTypes.DATE,
  },
  {
    getterMethods: {
      getAttributes() {
        return {
          homeId: this.homeId,
          token: this.token,
          createdAt: this.createdAt,
        }
      },
    },
    sequelize,
    freezeTableName: process.env.NODE_ENV === 'test',
  }
)

export default SmartAppToken
