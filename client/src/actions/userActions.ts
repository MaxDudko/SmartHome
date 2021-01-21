export const tokenValidationAction = (token: string) => {
    return {
        type: 'VALIDATE_TOKEN',
        token
    }
};

export const loginUserAction = (data: {}) => {
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

export const registerUserAction = (data: {}) => {
    return {
        type: 'REGISTER_USER',
        data
    }
};

export const saveUserDataAction = (data: {}) => {
    return {
        type: 'SAVE_USER_DATA',
        payload: {
            user: data
        }
    }
};