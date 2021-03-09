import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../config/db.config'

export interface DeviceAttributes {
  homeId: string
  deviceId: string
  type: string
  label: string
  value: string
  battery: number
  location?: string
  updatedAt?: any
  active: boolean
}

class Device extends Model<DeviceAttributes> implements DeviceAttributes {
  public homeId!: string
  public deviceId!: string
  public type!: string
  public label!: string
  public value!: string
  public battery!: number
  public location!: string
  public updatedAt!: any
  public active!: boolean

  public getValue(type: string) {
    switch (type) {
      case 'lock':
        return this.value === 'locked'
    }
  }

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
      active: this.active,
    }
  }

  public getAttributes() {
    return {
      homeId: this.homeId,
      deviceId: this.deviceId,
      type: this.type,
      label: this.label,
      value: this.getValue(this.type),
      battery: this.battery,
      location: this.location,
      updatedAt: this.updatedAt,
      active: this.active,
    }
  }
}

Device.init(
  {
    homeId: DataTypes.STRING,
    deviceId: DataTypes.STRING,
    type: DataTypes.STRING,
    label: DataTypes.STRING,
    value: DataTypes.STRING,
    battery: DataTypes.INTEGER,
    location: DataTypes.STRING,
    updatedAt: DataTypes.DATE,
    active: DataTypes.BOOLEAN,
  },
  { sequelize, freezeTableName: process.env.NODE_ENV === 'test' }
)

export default Device
