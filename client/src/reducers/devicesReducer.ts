import {AnyAction} from "redux";

export const initialState = {
    locks: []
}

const devices = (state = initialState, action: AnyAction) => {

    switch(action.type) {
        case 'SAVE_DEVICES_ACTION':
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
};

export default devices;