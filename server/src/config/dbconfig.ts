import { Pool } from 'pg';
import { Sequelize, Model, DataTypes } from 'sequelize'

// export default new Sequelize('postgres://admin:root@127.0.0.1:5432/smarthome');

const user = 'admin'
const host = '127.0.0.1'
const database = 'smarthome'
const password = 'root'
const port = 5432

export default new Sequelize(database, user, password, {
    host,
    port,
    dialect: 'postgres',
    logging: false
})