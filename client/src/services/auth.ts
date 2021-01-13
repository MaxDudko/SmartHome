import axios from "axios";

export const tokenValidationService = (request) => {
    const API_ENDPOINT = 'http://localhost:4000/profile';
    const token = request.token;

    if (token) {
        axios.post(API_ENDPOINT, {
            token: token
        }).then((data) => {
            console.log(data)
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
    console.log(request.data)
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
    console.log(request.data)
    const LOGIN_API_ENDPOINT = 'http://localhost:4000/changePassword';
    const data = request.data;

    return axios.post(LOGIN_API_ENDPOINT, {...data})
        .then(response => {
            const token = response.data.user.token;
        })
};
