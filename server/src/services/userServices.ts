import User from "../models/User";
import passport from "passport";

class UserServices {
    private static validateEmail(email: string) {
        return email.match(/^([a-zA-Z0-9._-]+@[a-zA-Z]+.[a-zA-Z]{2,4})$/) || !(email.length > 5 && email.length < 64);
    }

    private static validatePassword(password: string) {
        return password.match(/^(?=.*[A-Za-z0-9])(?=.*\d)[A-Za-z0-9\d]{8,64}$/);
    }

    public async createUser(email: string, password: string, fullName: string) {
        if (UserServices.validateEmail(email) && UserServices.validatePassword(password)) {
            const user = new User({email: email, fullName: fullName});
            user.setPassword(password);

            return User.create(user.getAttributes())
        }

        throw Error("email or password not valid")
    }

    public authenticateUser(email: string, password: string) {
        if (UserServices.validateEmail(email) && UserServices.validatePassword(password)) {
            return passport.authenticate('local', { session: false }, (err, passportUser) => {
                if (err) throw Error(err);

                if (passportUser) {
                    const user = passportUser;
                    user.token = passportUser.generateJWT();

                    return user.toAuthJSON();
                }
            })
        }

        throw Error("email or password not valid")
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