import { AnyAction } from 'redux'
import { REMOVE_DEVICES, SAVE_DEVICES } from '../actionTypes'

export interface DevicesState {
  locks: object[]
}

const initialState = {
  locks: [],
}

const devices = (state: DevicesState = initialState, action: AnyAction) => {
  switch (action.type) {
    case SAVE_DEVICES:
      return {
        ...state,
        ...action.payload,
      }
    case REMOVE_DEVICES:
      return initialState
    default:
      return state
  }
}

export default devices
