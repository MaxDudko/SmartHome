import {AnyAction} from "redux";

export const initialState = {
    id: null,
    email: null,
    fullName: null,
    token: null,
}
const user = (state = initialState, action: AnyAction) => {

    switch(action.type) {
        case 'SAVE_USER_DATA':
            return {
                ...state,
                ...action.payload
            };
        case 'LOGOUT_USER':
            localStorage.removeItem('token');
            window.location.reload();
            return {};
        default:
            return state;
    }
};

export default user;