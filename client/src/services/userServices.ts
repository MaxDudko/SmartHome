import axios from "axios";

export const tokenValidationService = (request) => {
    const API_ENDPOINT = 'http://localhost:4000/profile';
    const token = request.token;

    if (token) {
        return axios.post(API_ENDPOINT, {
            token: token
        }).then((data) => {
            return data;
        }).catch(() => {
            window.localStorage.clear();
        });
    }
};

export const registerUserService = (request) => {
    const REGISTER_API_ENDPOINT = 'http://localhost:4000/register';
    const data = request.data;

    return axios.post(REGISTER_API_ENDPOINT, {...data})
        .then(response => {
            const token = response.data.user.token;
            localStorage.setItem('token', token);
            window.location.reload();
        })
};

export const loginUserService = (request) => {
    const LOGIN_API_ENDPOINT = 'http://localhost:4000/login';
    const data = request.data;

    return axios.post(LOGIN_API_ENDPOINT, {...data})
        .then(response => {
            const token = response.data.user.token;
            localStorage.setItem('token', token);
            window.location.reload();
        })
};

export const changePasswordService = (request) => {
    const LOGIN_API_ENDPOINT = 'http://localhost:4000/change-password';
    const data = request.data;

    return axios.post(LOGIN_API_ENDPOINT, {...data})
        .then(response => {
            const token = response.data.user.token;
        })
};
