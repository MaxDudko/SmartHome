import { Sequelize, Model, DataTypes } from "sequelize";
const sequelize = new Sequelize("postgres://admin:root@127.0.0.1:5432/smarthome");

interface ResidentAttributes {
    userId: string;
    homeId: string;
    role: string;
    key: string;
}

class Resident extends Model<ResidentAttributes>
    implements ResidentAttributes {
    public userId!: string;
    public homeId!: string;
    public role!: string;
    public key!: string;
}

Resident.init({
    userId: DataTypes.STRING,
    homeId: DataTypes.STRING,
    role: DataTypes.STRING,
    key: DataTypes.STRING,
}, { sequelize })

export default Resident;