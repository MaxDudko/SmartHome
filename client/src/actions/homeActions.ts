import { HomeState } from '../reducers/homeReducer'

export const getHomeListAction = (userId: string) => {
  return {
    type: 'GET_HOME_LIST',
    payload: {
      userId,
    },
  }
}

export const selectHomeAction = (userId: string, homeId: string) => {
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

export const createHomeAction = (
  userId: string,
  homeName: string,
  homeAddress: string,
  key: string
) => {
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

export const joinHomeAction = (userId: string, homeId: string, key: string) => {
  return {
    type: 'JOIN_HOME',
    payload: {
      userId,
      homeId,
      key,
    },
  }
}

export const saveHomeAction = (data: HomeState) => {
  return {
    type: 'SAVE_HOME',
    payload: data,
  }
}
