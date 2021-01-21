import axios from "axios";

export const getHomeListService = (request) => {
    const API_ENDPOINT = 'http://localhost:4000/find-home';
    const data = request.payload;

    return axios.post(API_ENDPOINT, data);
};

export const selectHomeService = (request) => {
    const API_ENDPOINT = 'http://localhost:4000/select-home';
    const data = request.payload;

    return axios.post(API_ENDPOINT, data);
};

export const createHomeService = (request) => {
    const API_ENDPOINT = 'http://localhost:4000/create-home';
    const data = request.payload;

    return axios.post(API_ENDPOINT, data);
};

export const joinHomeService = (request) => {
    const API_ENDPOINT = 'http://localhost:4000/join-home';
    const data = request.payload;

    return axios.post(API_ENDPOINT, data);
};
