import { AnyAction } from 'redux'
import { REMOVE_DEVICES, SAVE_DEVICES, SAVE_TYPES } from '../actionTypes'

export interface DevicesState {
  activeDevices: object[]
  supportedDevices: object[]
}

const initialState = {
  activeDevices: [],
  supportedDevices: [],
}

const devices = (state: DevicesState = initialState, action: AnyAction) => {
  switch (action.type) {
    case SAVE_DEVICES:
      return {
        ...state,
        activeDevices: action.payload,
      }
    case SAVE_TYPES:
      return {
        ...state,
        supportedDevices: action.payload,
      }
    case REMOVE_DEVICES:
      return initialState
    default:
      return state
  }
}

export default devices
