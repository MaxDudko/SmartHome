import { Sequelize, Model, DataTypes } from "sequelize";
import * as dotenv from "dotenv";

const ENV_PATH = process.env.NODE_ENV === 'test' ? '/../../.env' : '/../../../.env';
dotenv.config({path: __dirname+ENV_PATH});

const DB_NAME = process.env.NODE_ENV === 'test' ? process.env.DB_TEST : process.env.DB_NAME;
const sequelize = new Sequelize(`postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:5432/${DB_NAME}`);

interface LockAttributes {
    home_id: string;
    device_id: string;
    type: string;
    label: string;
    value: string;
    battery: number;
    location?: string;
    updatedAt?: any;
}

class Lock extends Model<LockAttributes>
    implements LockAttributes {
    home_id!: string;
    device_id!: string;
    type!: string;
    label!: string;
    value!: string;
    battery!: number;
    location!: string;
    updatedAt!: any;

    public getAttributesAndCreate() {
        return {
            home_id: this.home_id,
            device_id: this.device_id,
            type: this.type,
            label: this.label,
            value: this.value,
            battery: this.battery,
            updatedAt: this.updatedAt,
        }
    }

    public getAttributes() {
        return {
            home_id: this.home_id,
            device_id: this.device_id,
            type: this.type,
            label: this.label,
            value: this.value === 'locked',
            battery: this.battery,
            location: this.location,
            updatedAt: this.updatedAt,
        }
    }
}

Lock.init({
    home_id: DataTypes.STRING,
    device_id: DataTypes.STRING,
    type: DataTypes.STRING,
    label: DataTypes.STRING,
    value: DataTypes.STRING,
    battery: DataTypes.INTEGER,
    location: DataTypes.STRING,
    updatedAt: DataTypes.DATE
}, { sequelize })

export default Lock;