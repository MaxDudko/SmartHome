import { Sequelize, DataTypes } from "sequelize";
const sequelize = new Sequelize("postgres://admin:root@127.0.0.1:5432/smarthome");

const User = sequelize.define("user", {
    name: DataTypes.TEXT,
    email: DataTypes.TEXT,
},{ timestamps: false });

export default User;