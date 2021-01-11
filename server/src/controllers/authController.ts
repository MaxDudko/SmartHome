import { Request, Response, NextFunction } from "express";
import User from "../models/User";
import passport from "passport";

class AuthController {
    private static validate(reqData: { [key: string]: string }, key: string, res: Response): Response|undefined {
        if(!reqData[key]) {
            return res.status(422).json({
                errors: {
                    [key]: 'is Required',
                },
            });
        }
    };

    public register(req: Request, res: Response) {
        const user = req.body;

        AuthController.validate(user, "email", res);
        AuthController.validate(user, "password", res);

        const finalUser = new User(user);

        finalUser.setPassword(user.password);

        return User.create(finalUser.getAttributes())
            .then(() => res.json({ user: finalUser.toAuthJSON() }))
            .catch(error => res.status(400).send(error))
    }

    public async login(req: Request, res: Response, next:NextFunction) {
        const user = req.body;

        AuthController.validate(user, "email", res);
        AuthController.validate(user, "password", res);

        return passport.authenticate('local', { session: false }, (err, passportUser) => {
            if(err) {
                return next(err);
            }

            console.log(">>>>>", passportUser)
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
    }

    public async changePassword(req: Request, res: Response) {

    }
}

export default AuthController;