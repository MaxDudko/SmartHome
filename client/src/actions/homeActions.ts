import {
  CREATE_HOME,
  GET_HOME_LIST,
  JOIN_HOME,
  SAVE_HOME,
  SELECT_ANOTHER_HOME,
  SELECT_HOME,
} from '../actionTypes'
import { HomeState } from '../reducers/homeReducer'

export const getHomeListAction = () => {
  return {
    type: GET_HOME_LIST,
  }
}

export const selectHomeAction = (homeId: string) => {
  return {
    type: SELECT_HOME,
    payload: {
      homeId,
    },
  }
}

export const selectAnotherHomeAction = () => {
  return {
    type: SELECT_ANOTHER_HOME,
  }
}

export const createHomeAction = (homeName: string, homeAddress: string, key: string) => {
  return {
    type: CREATE_HOME,
    payload: {
      homeName,
      homeAddress,
      key,
    },
  }
}

export const joinHomeAction = (homeId: string, key: string) => {
  return {
    type: JOIN_HOME,
    payload: {
      homeId,
      key,
    },
  }
}

export const saveHomeAction = (data: HomeState) => {
  return {
    type: SAVE_HOME,
    payload: data,
  }
}
