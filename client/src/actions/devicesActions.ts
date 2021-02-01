export const getDevicesAction = (homeId) => {
    return {
        type: 'GET_DEVICES_ACTION',
        payload: {
            homeId: homeId
        }
    }
};

export const lockToggleAction = (homeId) => {
    return {
        type: 'LOCK_TOGGLE_ACTION',
        payload: {
            homeId: homeId
        }
    }
};

export const saveDevicesAction = (data) => {
    return {
        type: 'SAVE_DEVICES_ACTION',
        payload: {
            ...data
        }
    }
};