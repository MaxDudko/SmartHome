import { Request, Response, NextFunction } from "express";
import passport from "passport";
import UserServices from "../services/userServices";

const services = new UserServices();

class UserController {
    public async createUser(req: Request, res: Response) {
        const {email, password, fullName} = req.body;

        if (email && password && fullName) {
            try {
                const user = await services.createUser(email, password, fullName);
                return res.status(200).json({user: user.toAuthJSON()})
            } catch (e) {
                return res.status(400).json({error: e.message})
            }

        } else {
            res.status(422).json({
                errors: {
                    message: 'All fields are Required',
                },
            });
        }
    }

    public async authenticateUser(req: Request, res: Response, next: NextFunction) {
        const {email, password} = req.body;

        if (email && password) {
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
                        message: 'Wrong login or password',
                    },
                });
            })(req, res, next);
        } else {
            res.status(422).json({
                errors: {
                    message: 'All fields are Required',
                },
            });
        }
    }

    public async checkToken(req: Request, res: Response) {
        // @ts-ignore
        const email = req.payload.email;
        if (email) {
            try {
                const user = await services.checkToken(email);
                return res.status(200).json({user})
            } catch (e) {
                return res.status(400).json({error: e.message})
            }

        } else {
            return res.status(400).send("All fields are Required")
        }
    }
}

export default UserController;