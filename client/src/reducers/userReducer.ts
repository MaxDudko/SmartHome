import { AnyAction } from 'redux'
import { REMOVE_USER_DATA, SAVE_HOME_LIST, SAVE_USER_DATA } from '../actionTypes'

export interface UserState {
  id: null | string
  email: null | string
  fullName: null | string
  token: null | string
  homeList: null | object[]
}

const initialState = {
  id: null,
  email: null,
  fullName: null,
  token: null,
  homeList: [],
}

const user = (state: UserState = initialState, action: AnyAction) => {
  switch (action.type) {
    case SAVE_USER_DATA:
      return {
        ...state,
        ...action.payload,
      }
    case REMOVE_USER_DATA:
      return initialState
    case SAVE_HOME_LIST:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}

export default user
