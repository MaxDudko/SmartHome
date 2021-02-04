import { Sequelize } from "sequelize";
import User from "./User";
import Home from "./Home";
import Resident from "./Resident";
import Lock from "./Lock";

const DB_NAME = process.env.NODE_ENV === 'test' ? <string>process.env.DB_NAME_TEST : <string>process.env.DB_NAME;
export const sequelize = new Sequelize(DB_NAME, <string>process.env.DB_USER, <string>process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

const DB = {
    Sequelize: Sequelize,
    sequelize: sequelize,
    user: User.sync(),
    home: Home.sync(),
    resident: Resident.sync(),
    lock: Lock.sync()
};

export default DB;
