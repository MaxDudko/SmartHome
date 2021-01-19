import {Request, Response} from "express";
import HomeServices from "../services/homeServices";

const services = new HomeServices();

class HomeController {
    public async findHomeList(req: Request, res: Response) {
        const {userId} = req.body;

        if (userId) {
            try {
                const homeList = await services.findHomeList(userId);
                return res.status(200).json({homeList: homeList})
            } catch (e) {
                return res.status(400).json({error: e.message})
            }

        } else {
            return res.status(400).send("User ID are " + typeof userId)
        }
    }

    public async createHome(req: Request, res: Response) {
        const {userId, homeName, homeAddress, role, key} = req.body;

        if (userId && homeName && homeAddress && role && key) {
            try {
                const resData = await services.createHome(userId, homeName, homeAddress, role, key);
                return res.status(200).json({data: resData})
            } catch (e) {
                return res.status(400).json({error: e.message})
            }

        } else {
            return res.status(400).send("All fields are Required")
        }


    }

    public async addResident(req: Request, res: Response) {
        const {userId, homeId, role, key} = req.body;

        if (userId && homeId && role && key) {
            try {
                const resData = await services.addResident(userId, homeId, role, key);
                return res.status(200).json({data: resData})
            } catch (e) {
                return res.status(400).json({error: e.message})
            }
        } else {
            return res.status(400).send("All fields are Required")
        }
    }

}

export default HomeController;