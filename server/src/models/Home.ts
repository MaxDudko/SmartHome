import { Sequelize, Model, DataTypes } from "sequelize";
const sequelize = new Sequelize("postgres://admin:root@127.0.0.1:5432/smarthome");

interface HomeAttributes {
    name: string;
}

class Home extends Model<HomeAttributes>
    implements HomeAttributes {
    public name!: string;

}

Home.init({
    name: DataTypes.STRING,
}, { sequelize })

export default Home;