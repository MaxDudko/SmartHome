export const getHomeListAction = (userId) => {
  return {
    type: 'GET_HOME_LIST',
    payload: {
      userId,
    },
  }
}

export const selectHomeAction = (userId, homeId) => {
  return {
    type: 'SELECT_HOME',
    payload: {
      userId,
      homeId,
    },
  }
}

export const selectAnotherHomeAction = () => {
  return {
    type: 'SELECT_ANOTHER_HOME',
  }
}
export const removeHomeData = () => {
  return {
    type: 'REMOVE_HOME_DATA',
  }
}

export const createHomeAction = (userId, homeName, homeAddress, key) => {
  return {
    type: 'CREATE_HOME',
    payload: {
      userId,
      homeName,
      homeAddress,
      key,
    },
  }
}

export const joinHomeAction = (userId, homeId, key) => {
  return {
    type: 'JOIN_HOME',
    payload: {
      userId,
      homeId,
      key,
    },
  }
}

export const saveHomeAction = (data) => {
  return {
    type: 'SAVE_HOME',
    payload: {
      home: data.home,
      resident: data.resident,
    },
  }
}
export const responseErrorAction = (error) => {
  return {
    type: 'RESPONSE_ERROR',
    payload: {
      error,
    },
  }
}
