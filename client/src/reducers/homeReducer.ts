import { AnyAction } from 'redux'
import { REMOVE_HOME_DATA, RESPONSE_ERROR, SAVE_HOME } from '../actionTypes'

export interface HomeState {
  id: null | string
  name: null | string
  address: null | string
  role: null | string
}

const initialState = {
  id: null,
  name: null,
  address: null,
  role: null,
}

const home = (state: HomeState = initialState, action: AnyAction) => {
  switch (action.type) {
    case SAVE_HOME:
      return {
        ...state,
        ...action.payload,
      }
    case REMOVE_HOME_DATA:
      return initialState
    case RESPONSE_ERROR:
      return state
    default:
      return state
  }
}

export default home
