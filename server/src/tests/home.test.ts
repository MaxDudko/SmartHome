import HomeServices from "../services/homeServices";
import User from "../models/User";
import Home from "../models/Home";
import Resident from "../models/Resident";
import DB from "../models";
const services = new HomeServices();

describe('HomeServices behavior:', () => {
    describe("findHomeList():", () => {
        beforeAll(async () => {
            DB.sequelize.sync({force: true})
                .then(() => console.log('DB: Connection has been established successfully.'))
                .catch(err => console.log('DB: Unable to connect to the database:', err));
        });

        afterAll(async () => {
            DB.sequelize.drop()
                .then(() => console.log('All collections dropped'))
                .catch(err => console.log(err))
        });

        it('Should return user\'s home-list:', async () => {
            const user = new User({email: 'test123@email.com', fullName: 'User Test'});
            user.setPassword('test123');
            const newUser = await User.create(user.getAttributes())

            const home1 = new Home({name: 'TEST HOME', address: 'Test, 1'});
            home1.setPassword('test1234');
            const newHome1 = await Home.create(home1.get());

            const home2 = new Home({name: 'HOME TEST', address: 'Test, 2'});
            home2.setPassword('test1234');
            const newHome2 = await Home.create(home2.get());

            await Resident.create({userId: newUser.id, homeId: newHome1.id, role: 'admin'})
            await Resident.create({userId: newUser.id, homeId: newHome2.id, role: 'user'})

            const result = [
                {id: newHome1.id, name: newHome1.name, address: newHome1.address},
                {id: newHome2.id, name: newHome2.name, address: newHome2.address}
            ];

            const homeList = await services.findHomeList(newUser.id.toString());

            expect(homeList).toEqual(result);
        });

        it('Should return empty array, because user hasn\'t not one home:', async () => {
            const user = new User({email: 'test123@email.com', fullName: 'User Test'});
            user.setPassword('test123');
            const newUser = await User.create(user.getAttributes())

            const result: any[] = [];

            const homeList = await services.findHomeList(newUser.id.toString());

            expect(homeList).toEqual(result);
        });
    });

    describe("createHome():", () => {
        it('Should create new Home and return home data:', async () => {
            const user = new User({email: 'test123@email.com', fullName: 'User Test'});
            user.setPassword('test123');
            const newUser = await User.create(user.getAttributes())

            const result = {
            //
            };

            const homeList = await services.createHome(newUser.id.toString(), "TEST HOME", "TestTest, 1", "admin", "qwerty123");

            expect(homeList).toEqual(result);
        });
    });

    describe("addResident():", () => {
        it('Should add user at home and return home data:', async () => {
            const user = new User({email: 'test123@email.com', fullName: 'User Test'});
            user.setPassword('test123');
            const newUser = await User.create(user.getAttributes())

            const home = new Home({name: 'TEST HOME', address: 'Test, 1'});
            home.setPassword('test1234');
            const newHome = await Home.create(home.get());

            const result = {
                //
            };

            const homeList = await services.addResident(newUser.id.toString(), newHome.id.toString(), 'user', 'test1234');

            expect(homeList).toEqual(result);
        });

        it('Should return error message, User already resident in this home:', async () => {
            const user = new User({email: 'test123@email.com', fullName: 'User Test'});
            user.setPassword('test123');
            const newUser = await User.create(user.getAttributes())

            const home = new Home({name: 'TEST HOME', address: 'Test, 1'});
            home.setPassword('test1234');
            const newHome = await Home.create(home.get());

            await Resident.create({userId: newUser.id, homeId: newHome.id, role: 'admin'})

            const result = {
                //
            };

            const homeList = await services.addResident(newUser.id.toString(), newHome.id.toString(), 'user', 'test1234');

            expect(homeList).toEqual(result);
        });

        it('Should return error, User or Home not found:', async () => {
            const user = new User({email: 'test123@email.com', fullName: 'User Test'});
            user.setPassword('test123');
            const newUser = await User.create(user.getAttributes())

            const home = new Home({name: 'TEST HOME', address: 'Test, 1'});
            home.setPassword('test1234');
            const newHome = await Home.create(home.get());

            const result = {
                //
            };

            const homeList = await services.addResident(newUser.id.toString(), 'wrongHomeID', 'user', 'test1234');

            expect(homeList).toEqual(result);
        });

        it('Should return error, because security Key is wrong:', async () => {
            const user = new User({email: 'test123@email.com', fullName: 'User Test'});
            user.setPassword('test123');
            const newUser = await User.create(user.getAttributes())

            const home = new Home({name: 'TEST HOME', address: 'Test, 1'});
            home.setPassword('test1234');
            const newHome = await Home.create(home.get());

            const result = {
                //
            };

            const homeList = await services.addResident(newUser.id.toString(), newHome.id.toString(), 'user', 'wrongKey');

            expect(homeList).toEqual(result);
        });
    });
})
