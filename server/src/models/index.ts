import { Sequelize } from "sequelize";
import dbConfig from "../config/db.config";
import UserModel from "./User";
import Home from "./Home";
import Resident from "./Resident";
import * as dotenv from "dotenv";

dotenv.config({path: __dirname+'/../../../.env'});
const DB_NAME = process.env.NODE_ENV === 'test' ? <string>process.env.DB_TEST : <string>dbConfig.DB;

const sequelize = new Sequelize(DB_NAME, <string>dbConfig.USER, <string>dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: "postgres",
    pool: dbConfig.pool
});

const DB = {
    Sequelize: Sequelize,
    sequelize: sequelize,
    user: UserModel.sync(),
    home: Home.sync(),
    resident: Resident.sync()
};

export default DB;
