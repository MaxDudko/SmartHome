import HomeServices from "../services/homeServices";
import User from "../models/User";
import Home from "../models/Home";
import Resident from "../models/Resident";

const services = new HomeServices();

const syncAll = async () => {
    await User.sync({force: true})
    await Home.sync({force: true})
    await Resident.sync({force: true})
};
const dropAll = async () => {
    await User.drop()
    await Home.drop()
    await Resident.drop()
};

const createUser = async (email: string, fullName: string, pass: string) => {
    const user = new User({email: email, fullName: fullName});
    user.setPassword(pass);
    return User.create(user.getAttributes())
};
const createHome = async (name: string, address: string, key: string) => {
    const home = new Home({name: name, address: address});
    home.setPassword(key);
    return Home.create(home.get());
};
const createResident = async (userId: string, homeId: string, role: string) => {
    return Resident.create({userId: userId, homeId: homeId, role: role})
};

describe('HomeServices behavior:', () => {
    describe("findHomeList():", () => {
        beforeEach(async () => {
            await syncAll();
        });

        afterEach(async () => {
            await dropAll();
        });

        it('Should return user\'s home-list:', async () => {
            const user = await createUser( 'test123@email.com', 'User Test', 'test123');
            const home1 = await createHome('TEST HOME', 'Test, 1', 'test1234');
            const home2 = await createHome('HOME TEST',  'Test, 2', 'test1234');
            await createResident(user.id, home1.id, 'admin');
            await createResident(user.id, home2.id, 'user');

            const result = [
                {id: home1.id, name: home1.name, address: home1.address, role: 'admin'},
                {id: home2.id, name: home2.name, address: home2.address, role: 'user'}
            ];

            const homeList = await services.findHomeList(user.id.toString());

            expect(homeList).toEqual(result);
        });

        it('Should return empty array, because user hasn\'t not one home:', async () => {
            const user = await createUser( 'test123@email.com', 'User Test', 'test123');

            const result: any[] = [];

            const homeList = await services.findHomeList(user.id.toString());

            expect(homeList).toEqual(result);
        });
    });

    describe("selectHome():", () => {
        beforeEach(async () => {
            await syncAll();
        });

        afterEach(async () => {
            await dropAll();
        });

        it('Should return home data:', async () =>  {
            const user = await  createUser('test123@email.com', 'User Test', 'test123');
            const home = await createHome('TEST HOME', 'Test, 1', 'test1234');
            await createResident(user.id, home.id, 'admin');

            const result = {
                home: { id: 1, name: 'TEST HOME', address: 'Test, 1' },
                resident: { homeId: '1', userId: '1', role: 'admin' }
            };

            const homeData = await services.selectHome(user.id.toString(), home.id.toString());

            expect(homeData).toEqual(result);
        });

        it('Should return error, User not resident in this Home:', async () =>  {
            const user = await  createUser('test123@email.com', 'User Test', 'test123');
            const home = await createHome('TEST HOME', 'Test, 1', 'test1234');

            const result = 'User not resident in this Home';

            expect.assertions(1);
            try {
                await services.selectHome(user.id.toString(), home.id.toString());
            } catch (e) {
                expect(e.message).toMatch(result);
            }
        });

        it('Should return error, Home not found:', async () =>  {
            const user = await  createUser('test123@email.com', 'User Test', 'test123');
            const home = await createHome('TEST HOME', 'Test, 1', 'test1234');
            await createResident(user.id, home.id, 'admin');

            const result = 'Home not found';

            try {
                await services.selectHome(user.id.toString(), home.id.toString());
            } catch (e) {
                expect(e.message).toMatch(result);
            }
        });
    });

    describe("createHome():", () => {
        beforeEach(async () => {
            await syncAll();
        });

        afterEach(async () => {
            await dropAll();
        });

        it('Should create new Home and return home data:', async () => {
            const user = await createUser( 'test123@email.com', 'User Test', 'test123');

            const result = {
                home: { id: 1, name: 'TEST HOME', address: 'TestTest, 1' },
                resident: { homeId: '1', userId: '1', role: 'admin' }
            };

            const homeData = await services.createHome(user.id.toString(), "TEST HOME", "TestTest, 1", "admin", "qwerty123");
            expect(homeData).toEqual(result);
        });

        it('Should return error message, User not found:', async () => {
            const result = 'User not found';

            expect.assertions(1);
            try {
                await services.createHome('111', "TEST HOME", "TestTest, 1", "admin", "qwerty123");
            } catch (e) {
                expect(e.message).toMatch(result);
            }
        });
    });

    describe("addResident():", () => {
        beforeEach(async () => {
            await syncAll();
        });

        afterEach(async () => {
            await dropAll();
        });

        it('Should add user at home and return home data:', async () => {
            const user = await createUser( 'test123@email.com', 'User Test', 'test123');
            const home = await createHome('TEST HOME', 'Test, 1', 'test1234');

            const result = {
                home: { id: 1, name: 'TEST HOME', address: 'Test, 1' },
                resident: { homeId: '1', userId: '1', role: 'user' }
            };

            const homeData = await services.addResident(user.id.toString(), home.id.toString(), 'user', 'test1234');
            expect(homeData).toEqual(result);
        });

        it('Should return error message, User already resident in this home:', async () => {
            const user = await createUser( 'test123@email.com', 'User Test', 'test123');
            const home = await createHome('TEST HOME', 'Test, 1', 'test1234');
            await Resident.create({userId: user.id, homeId: home.id, role: 'admin'})

            const result = 'User already resident in this home';

            expect.assertions(1);
            try {
                await services.addResident(user.id.toString(), home.id.toString(), 'user', 'test1234');
            } catch (e) {
                expect(e.message).toMatch(result);
            }
        });

        it('Should return error, User or Home not found:', async () => {
            const user = await createUser( 'test123@email.com', 'User Test', 'test123');
            await createHome('TEST HOME', 'Test, 1', 'test1234');

            const result = 'User or Home not found';

            expect.assertions(1);
            try {
                await services.addResident(user.id.toString(), '111', 'admin', 'test1234')
            } catch (e) {
                expect(e.message).toMatch(result);
            }
        });

        it('Should return error, because security Key is wrong:', async () => {
            const user = await createUser( 'test123@email.com', 'User Test', 'test123');
            const home = await createHome('TEST HOME', 'Test, 1', 'test1234');

            const result = 'Wrong Key';

            expect.assertions(1);
            try {
                await services.addResident(user.id.toString(), home.id.toString(), 'user', 'wrongKey');
            } catch (e) {
                expect(e.message).toMatch(result);
            }
        });
    });
});
