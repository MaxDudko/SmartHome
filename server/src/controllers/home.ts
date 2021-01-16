import { Request, Response, NextFunction } from "express";
import Home from "../models/Home";
import Resident from "../models/Resident";
import User from "../models/User";
import user from "./user";

class HomeController {

    public async get(req: Request, res: Response) {
        // const user = req.body.user;
        //
        // // @ts-ignore
        // await Resident.findOne({where: {userId: user.id}})
        //     .then(data => {
        //         console.log(data)
        //     })
    }

    public async create(req: Request, res: Response) {
        const {userId, homeName, role} = req.body;

        // @ts-ignore
        const user = await User.findOne({where: {id: userId}})
            .then(user => {
                return user?.toAuthJSON();
            })
            .catch(err => res.send(err))
        if (user) {

            const home = await Home.create(new Home({
                name: homeName
            }))
                .then(home => {
                    return home?.get();
                })
                .catch(err => res.send(err))

            if (user instanceof User && home instanceof Home) {
                await Resident.create(new Resident({
                    userId: user.id,
                    homeId: home.id,
                    role: role
                }))
                    .then((resident) => {
                        console.log(':::::: ', resident)
                        if (resident) return res.send(resident)
                    })
                    .catch(err => res.send(err))
            }
        }

    }

    public async add(req: Request, res: Response) {
        const {userId, homeId, role} = req.body;

        const user = await User.findOne({where: {id: userId}})
            .then(user => {
                return user?.toAuthJSON();
            })
            .catch(err => res.send(err))

        const home = await Home.findOne({where: {id: homeId}})
            .then(home => {
                return home?.get();
            })
            .catch(err => res.send(err))

        if (user instanceof User && home instanceof Home) {
            await Resident.create(new Resident({
                userId: user.id,
                homeId: home.id,
                role: role
            }))
                .then(resident => {
                    if (resident) return res.send(resident)
                })
                .catch(err => res.send(err))
        }
    }

}

export default HomeController;