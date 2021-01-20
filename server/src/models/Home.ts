import { Sequelize, Model, DataTypes } from "sequelize";
import crypto from "crypto";
import * as dotenv from "dotenv";
dotenv.config({path: __dirname+'/../../../.env'});
const DB_NAME = process.env.NODE_ENV === 'test' ? process.env.DB_TEST : process.env.DB_NAME;
const sequelize = new Sequelize(`postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:5432/${DB_NAME}`);

interface HomeAttributes {
    id?: string;
    name: string;
    address: string;
    salt?: string;
    hash?: string;
}

class Home extends Model<HomeAttributes>
    implements HomeAttributes {
    public id!: string;
    public name!: string;
    public address!: string;
    public salt!: string;
    public hash!: string;

    public getAttributes() {
        return {
            id: this.id,
            name: this.name,
            address: this.address,
        }
    }
    public setPassword(password: string): void {
        this.salt = crypto.randomBytes(16).toString('hex');
        this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    }

    public validatePassword(password: string): boolean {
        const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
        return this.hash === hash;
    }

}

Home.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    salt: DataTypes.STRING,
    hash: DataTypes.TEXT,
}, { sequelize })

export default Home;