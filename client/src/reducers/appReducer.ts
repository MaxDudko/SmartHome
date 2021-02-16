import { AnyAction } from 'redux'

export const initialState = {
  isReady: true,
  addDeviceModalOpen: false,
  responseError: '',
}

const app = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case 'APP_READY':
      return { ...state, isReady: true }
    case 'OPEN_ADD_DEVICE_MODAL_ACTION':
      return { ...state, addDeviceModalOpen: true }
    case 'CLOSE_ADD_DEVICE_MODAL_ACTION':
      return { ...state, addDeviceModalOpen: false }
    case 'RESPONSE_ERROR':
      return { ...state, responseError: action.payload }
    default:
      return state
  }
}

export default app
