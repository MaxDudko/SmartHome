import axios from "axios";

export const getDevicesService = (request) => {
    const API_ENDPOINT = 'http://localhost:4000/smart-api/get-devices';
    const data = request.payload;

    return axios.post(API_ENDPOINT, data);
};

export const lockToggleService = async (request) => {
    const API_ENDPOINT = 'http://localhost:4000/smart-api/lock-toggle';
    const data = request.payload;

    await axios.post(API_ENDPOINT, data);

    const homeId = localStorage.getItem('homeId');
    const req = {
        payload: {
            homeId: homeId && homeId.toString()
        }
    }

    return getDevicesService(req)
};
