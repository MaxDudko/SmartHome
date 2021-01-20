import { Sequelize, Model, DataTypes } from "sequelize";
import * as dotenv from "dotenv";

const ENV_PATH = process.env.NODE_ENV === 'test' ? '/../../.env' : '/../../../.env';
dotenv.config({path: __dirname+ENV_PATH});

const DB_NAME = process.env.NODE_ENV === 'test' ? process.env.DB_TEST : process.env.DB_NAME;
const sequelize = new Sequelize(`postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:5432/${DB_NAME}`);

interface ResidentAttributes {
    userId: string;
    homeId: string;
    role: string;
}

class Resident extends Model<ResidentAttributes>
    implements ResidentAttributes {
    public userId!: string;
    public homeId!: string;
    public role!: string;

    public getAttributes() {
        return {
            id: this.userId,
            name: this.homeId,
            address: this.role,
        }
    }
}

Resident.init({
    userId: DataTypes.STRING,
    homeId: DataTypes.STRING,
    role: DataTypes.STRING,
}, { sequelize })

export default Resident;