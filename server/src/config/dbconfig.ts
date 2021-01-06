import { Sequelize } from 'sequelize'

const database = 'smarthome'
const user = 'admin'
const password = 'root'

export default new Sequelize(database, user, password, {
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres',
    logging: false
})