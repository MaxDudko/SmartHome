import { Sequelize } from "sequelize";
import dbConfig from "../config/db.config";
import User from "./User";
import Home from "./Home";
import Resident from "./Resident";

const sequelize = new Sequelize(<string>dbConfig.DB, <string>dbConfig.USER, <string>dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: "postgres",
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const DB = {
    Sequelize: Sequelize,
    sequelize: sequelize,
    user: User.sync(),
    home: Home.sync(),
    resident: Resident.sync()
};

export default DB;
