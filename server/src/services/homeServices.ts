import User from "../models/User";
import Home from "../models/Home";
import Resident from "../models/Resident";

class HomeServices {
    public async findHomeList(userId: string) {
        const residents = await Resident.findAll({where: {userId}})

        if (residents) {
            return await Promise.all(
                residents.map(async doc => {
                    const home = await Home.findOne({where: {id: doc.getDataValue('homeId')}})
                    return {
                        ...home?.getAttributes(),
                        role: doc.getDataValue('role')
                    }
                })
            );
        }
    }

    public async selectHome(userId: string, homeId: string) {
        const resident = await Resident.findOne({where: {userId, homeId}})

        if (resident) {
            const home = await Home.findOne({where: {id: homeId}});

            if (home) {
                return {
                    home: home.getAttributes(),
                    resident: resident.getAttributes()
                }
            }
            throw Error("Home not found")
        }
        throw Error("User not resident in this Home")
    }

    public async createHome(userId: string, homeName: string, homeAddress: string, key: string) {
        const user = await User.findOne({where: {id: userId}})

        if (user) {
            const newHome = new Home({
                name: homeName,
                address: homeAddress,
            });

            newHome.setPassword(key);

            const home = await Home.create(newHome.get());

            const resident = await Resident.create({
                userId: userId,
                homeId: home.id,
                role: 'admin',
            })

            return {
                home: home.getAttributes(),
                resident: resident.getAttributes()
            };
        }
        throw Error("User not found")
    }

    public async addResident(userId: string, homeId: string, key: string) {
        const alreadyResident = await Resident.findOne({where: {userId: userId, homeId: homeId}});
        if (alreadyResident) throw Error('User already resident in this home')

        const user = await User.findOne({where: {id: userId}});
        const home = await Home.findOne({where: {id: homeId}});

        if (user && home) {
            const passValid = home.validatePassword(key);
            if (passValid) {
                const resident = await Resident.create(
                    {
                        userId: userId,
                        homeId: home.id,
                        role: 'user',
                    }
                );
                return {
                    home: home.getAttributes(),
                    resident: resident.getAttributes()
                };
            }
            throw Error('Wrong Key')
        }
        throw Error('User or Home not found')
    }
}

export default HomeServices;