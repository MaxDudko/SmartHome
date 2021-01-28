import {Request, Response} from "express";
import SmartAppServices from "../services/smartAppServices";

const services = new SmartAppServices();

class SmartAppController {
    public async updateState(req: Request, res: Response) {
        const state = req.body;
            if (state) {
                try {
                    await services.updateState(state);
                    res.status(200).send('devices state updated');
                } catch (e) {
                    return res.status(400).json({error: e.message})
                }
            }
    }

}

export default SmartAppController;