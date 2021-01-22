export const getHomeListAction = (userId) => {
    return {
        type: 'GET_HOME_LIST',
        payload: {
            userId: userId
        }
    }
};

export const selectHomeAction = (userId, homeId) => {
    return {
        type: 'SELECT_HOME',
        payload: {
            userId: userId,
            homeId: homeId,
        }
    }
};

export const selectAnotherHomeAction = () => {
    return {
        type: 'SELECT_ANOTHER_HOME'
    }
};

export const createHomeAction = (userId, homeName, homeAddress, role, key) => {
    return {
        type: 'CREATE_HOME',
        payload: {
            userId: userId,
            homeName: homeName,
            homeAddress: homeAddress,
            role: role,
            key: key
        }
    }
};

export const joinHomeAction = (userId, homeId, role, key) => {
    return {
        type: 'JOIN_HOME',
        payload: {
            userId: userId,
            homeId: homeId,
            role: role,
            key: key
        }
    }
};

export const saveHomeAction = (data) => {
    return {
        type: 'SAVE_HOME',
        payload: {
            home: data.home,
            resident: data.resident,
        }
    }
};