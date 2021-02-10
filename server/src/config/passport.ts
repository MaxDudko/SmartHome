import {Strategy as LocalStrategy} from "passport-local";
import User from "../models/User";

const strategy = new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
}, (email: string, password: string, done: any) => {
    User.findOne({where: {email}})
        .then((user: any) => {
            if(!user || !user.validatePassword(password)) {
                return done(null, false, {
                    errors: {
                        'login or password': 'not valid'
                    }
                });
            }

            return done(null, user);
        })
        .catch(done)
});

export default strategy;
