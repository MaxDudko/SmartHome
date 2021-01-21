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
            return {
                ...state,
                ...action.payload.home,
                role: action.payload.resident.role
            };
        default:
            return state;
    }
};

export default home;