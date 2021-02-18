import { DevicesState } from '../reducers/devicesReducer'

export const getDevicesAction = (homeId: string) => {
  return {
    type: 'GET_DEVICES',
    payload: {
      homeId,
    },
  }
}

export const lockToggleAction = (homeId: string) => {
  return {
    type: 'LOCK_TOGGLE',
    payload: {
      homeId,
    },
  }
}

export const saveDevicesAction = (data: DevicesState) => {
  return {
    type: 'SAVE_DEVICES',
    payload: {
      ...data,
    },
  }
}

export const removeDevicesAction = () => {
  return {
    type: 'REMOVE_DEVICES',
    payload: {},
  }
}
