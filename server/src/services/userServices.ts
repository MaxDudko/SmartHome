import User from "../models/User";
import passport from "passport";

class UserServices {
    private validateFields(email: string, password: string) {
        const emailValid = email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        const passwordValid = password.match(/^(?=.*[A-Za-z0-9])(?=.*\d)[A-Za-z0-9\d]{8,}$/);

        if (emailValid && passwordValid) return true;
    }

    public async createUser(email: string, password: string, fullName: string) {
        if (this.validateFields(email, password)) {
            const user = new User({email: email, fullName: fullName});
            user.setPassword(password);

            return User.create(user.getAttributes())
        }

        throw Error("email or password not valid")
    }

    public async authenticateUser(email: string, password: string) {
        if (this.validateFields(email, password)) {
            return await passport.authenticate('local', { session: false }, (err, passportUser) => {
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