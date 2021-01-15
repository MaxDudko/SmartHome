import {AnyAction} from "redux";

export const initialState = {
    currentPage: "devices",
    addDeviceModalOpen: false,
}

const interfaceReducer = (state = initialState, action: AnyAction) => {

    switch(action.type) {
        case 'SWITCH_PAGE':
            return { ...state, currentPage: action.payload.currentPage };
        case 'OPEN_ADD_DEVICE_MODAL_ACTION':
            return { ...state, addDeviceModalOpen: true };
        case 'CLOSE_ADD_DEVICE_MODAL_ACTION':
            return { ...state, addDeviceModalOpen: false };
        default:
            return state;
    }
};

export default interfaceReducer;