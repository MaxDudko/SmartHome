const authReducer = (state = [], action) => {
    const response = action.response;

    switch(action.type) {
        case 'TOKEN_VALIDATION_SUCCESS':
            return { ...state, response };
        case 'TOKEN_VALIDATION_ERROR':
            return { ...state, response };
        case 'REGISTER_USER_SUCCESS':
            return { ...state, response };
        case 'REGISTER_USER_ERROR':
            return { ...state, response };
        case 'LOGIN_USER_SUCCESS':
            return { ...state, response };
        case 'LOGIN_USER_ERROR':
            return { ...state, response };
        default:
            return state;
    }
};

export default authReducer;