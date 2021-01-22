import {AnyAction} from "redux";

export const initialState = {
    id: null,
    name: null,
    address: null,
    role: null
}

const home = (state = initialState, action: AnyAction) => {

    switch(action.type) {
        case 'SAVE_HOME':
            localStorage.setItem('homeId', action.payload.resident.homeId)
            return {
                ...state,
                ...action.payload.home,
                role: action.payload.resident.role
            };
        case 'SELECT_ANOTHER_HOME':
            localStorage.removeItem('homeId');
            window.location.reload();
            return {};
        default:
            return state;
    }
};

export default home;