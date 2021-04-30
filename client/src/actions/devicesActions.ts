import {
  ADD_DEVICES,
  GET_DEVICES,
  GET_SUPPORTED_DEVICES,
  LOCK_TOGGLE,
  REMOVE_DEVICES,
  SAVE_DEVICES,
} from '../actionTypes'

export const getDevicesAction = (homeId: string) => {
  return {
    type: GET_DEVICES,
    payload: {
      homeId,
    },
  }
}

export const getSupportedDevicesAction = (homeId: string) => {
  return {
    type: GET_SUPPORTED_DEVICES,
    payload: {
      homeId,
    },
  }
}

export const addDevicesAction = (devices: string[], homeId: string) => {
  return {
    type: ADD_DEVICES,
    payload: {
      devices,
      homeId,
    },
  }
}

export const lockToggleAction = (homeId: string) => {
  return {
    type: LOCK_TOGGLE,
    payload: {
      homeId,
    },
  }
}

export const saveDevicesAction = (data: object[]) => {
  return {
    type: SAVE_DEVICES,
    payload: data,
  }
}

export const removeDevicesAction = () => {
  return {
    type: REMOVE_DEVICES,
    payload: {},
  }
}
