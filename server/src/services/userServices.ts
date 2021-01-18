import User from "../models/User";
import passport from "passport";

class UserServices {
    public async createUser(email: string, password: string, fullName: string) {
        const user = new User({email: email, fullName: fullName});
        user.setPassword(password);

        return User.create(user.getAttributes())
    }

    public async authenticateUser(email: string, password: string) {
        return await passport.authenticate('local', { session: false }, (err, passportUser) => {
            if (err) throw Error(err);

            if (passportUser) {
                const user = passportUser;
                user.token = passportUser.generateJWT();

                return user.toAuthJSON();
            }
        })

    }

    public async checkToken(email: string) {
        return User.findOne({where: {email}})
            .then((user) => {
                if(!user) throw Error('user not found');

                return user.toAuthJSON();
            });
    }
}

export default UserServices;