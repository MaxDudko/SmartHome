import {AnyAction} from "redux";

export const initialState = {
    id: null,
    email: null,
    fullName: null,
    token: null,
    homeList: [],
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
            localStorage.removeItem('homeId');
            window.location.reload();
            return {};
        case 'SAVE_HOME_LIST':
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
};

export default user;