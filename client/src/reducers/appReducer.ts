import { AnyAction } from 'redux'
import { APP_READY, OPEN_DEVICES_SIDEBAR, OPEN_MODAL, RESPONSE_ERROR } from '../actionTypes'

export interface AppState {
  isReady: boolean
  modalOpen: boolean
  devicesSidebarOpen: boolean
  responseError: null | string
}
const initialState = {
  isReady: false,
  modalOpen: false,
  devicesSidebarOpen: true,
  responseError: null,
}

const app = (state: AppState = initialState, action: AnyAction) => {
  switch (action.type) {
    case APP_READY:
      return { ...state, isReady: true }
    case OPEN_MODAL:
      return { ...state, modalOpen: !state.modalOpen }
    case OPEN_DEVICES_SIDEBAR:
      return { ...state, devicesSidebarOpen: !state.devicesSidebarOpen }
    case RESPONSE_ERROR:
      return { ...state, responseError: action.payload }
    default:
      return state
  }
}

export default app
