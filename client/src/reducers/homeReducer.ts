import {AnyAction} from "redux";

export const initialState = {

}

const home = (state = initialState, action: AnyAction) => {

    switch(action.type) {
        case '':
            return { ...state, ...{} };
        default:
            return state;
    }
};

export default home;