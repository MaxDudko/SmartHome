import { Sequelize } from "sequelize";
import dbConfig from "../config/db.config";
import User from "./User";

const sequelize = new Sequelize(<string>process.env.DB, <string>process.env.USER, <string>process.env.PASSWORD, {
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
    user: User.sync()
};

export default DB;
