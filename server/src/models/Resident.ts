import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../config/db.config'

interface ResidentAttributes {
  userId: string
  homeId: string
  role: string
}

class Resident extends Model<ResidentAttributes> implements ResidentAttributes {
  public userId!: string
  public homeId!: string
  public role!: string

  public getAttributes() {
    return {
      userId: this.userId,
      homeId: this.homeId,
      role: this.role,
    }
  }
}

Resident.init(
  {
    userId: DataTypes.STRING,
    homeId: DataTypes.STRING,
    role: DataTypes.STRING,
  },
  { sequelize, freezeTableName: process.env.NODE_ENV === 'test' }
)

export default Resident
