import Lock from "../models/Lock";

class SmartAppServices {
    public async updateState(state: any) {
        console.log(state)
        const {type, value, device_id} = state[0];

        if (type === 'lock') {
            await Lock.update({value: value}, {where: {device_id: device_id}})
        }
    }
}

export default SmartAppServices;