import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../config/db.config'

export interface LockAttributes {
  homeId: string
  deviceId: string
  type: string
  label: string
  value: string
  battery: number
  location?: string
  updatedAt?: any
}

class Lock extends Model<LockAttributes> implements LockAttributes {
  public homeId!: string
  public deviceId!: string
  public type!: string
  public label!: string
  public value!: string
  public battery!: number
  public location!: string
  public updatedAt!: any

  public getAttributesAndCreate() {
    return {
      homeId: this.homeId,
      deviceId: this.deviceId,
      type: this.type,
      label: this.label,
      value: this.value,
      location: this.location,
      battery: this.battery,
      updatedAt: this.updatedAt,
    }
  }

  public getAttributes() {
    return {
      homeId: this.homeId,
      deviceId: this.deviceId,
      type: this.type,
      label: this.label,
      value: this.value === 'locked',
      battery: this.battery,
      location: this.location,
      updatedAt: this.updatedAt,
    }
  }
}

Lock.init(
  {
    homeId: DataTypes.STRING,
    deviceId: DataTypes.STRING,
    type: DataTypes.STRING,
    label: DataTypes.STRING,
    value: DataTypes.STRING,
    battery: DataTypes.INTEGER,
    location: DataTypes.STRING,
    updatedAt: DataTypes.DATE,
  },
  { sequelize, freezeTableName: process.env.NODE_ENV === 'test' }
)

export default Lock
