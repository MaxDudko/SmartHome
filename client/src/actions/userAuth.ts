export const tokenValidationAction = (token) => {
    return {
        type: 'VALIDATE_TOKEN',
        token
    }
};

export const loginUserAction = (data) => {
    return {
        type: 'LOGIN_USER',
        data
    }
};

export const logoutUserAction = () => {
    return {
        type: 'LOGOUT_USER'
    }
};

export const registerUserAction = (data) => {
    return {
        type: 'REGISTER_USER',
        data
    }
};