import { Request, Response, NextFunction } from "express";
import User from "../models/User";
import passport from "passport";

class UserController {

    public register(req: Request, res: Response) {
        const user = req.body;

        if (user.email && user.password && user.fullName) {
            const finalUser = new User(user);

            finalUser.setPassword(user.password);

            return User.create(finalUser.getAttributes())
                .then(() => res.json({ user: finalUser.toAuthJSON() }))
                .catch(error => res.status(400).send(error))
        } else {
            res.status(422).send("All fields are Required")
        }
    }

    public async login(req: Request, res: Response, next:NextFunction) {
        const user = req.body;

        if (user.email && user.password) {
            return passport.authenticate('local', { session: false }, (err, passportUser) => {
                if(err) {
                    return next(err);
                }

                if(passportUser) {
                    const user = passportUser;
                    user.token = passportUser.generateJWT();

                    return res.json({ user: user.toAuthJSON() });
                }

                return res.status(400).json({
                    errors: {
                        password: 'is Required',
                    },
                });
            })(req, res, next);
        } else {
            res.status(422).send("All fields are Required")
        }
    }

    public async changePassword(req: Request, res: Response) {

    }

    public profile(req: Request, res: Response) {
        // @ts-ignore
        const email = req.payload.email;
        if (email) {
            return User.findOne({where: {email: email}})
                .then((user) => {
                    if(!user) {
                        return res.sendStatus(400);
                    }

                    return res.json({ user: user.toAuthJSON() });
                });
        } else {
            res.status(422).send("Authentication if Failed")
        }
    }
}

export default UserController;