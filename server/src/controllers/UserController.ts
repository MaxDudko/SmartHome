import { Request, Response } from "express";
import User from "../models/User";

class UserController {
    public async register(req: Request, res: Response) {
        User.create(req.body)
            .then(data => res.send(data))
            .catch(error => res.status(400).send(error))
    }
}

export default UserController;