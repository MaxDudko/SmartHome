import { put, takeLatest } from 'redux-saga/effects'
import {
  ADD_DEVICES,
  GET_DEVICES,
  GET_SUPPORTED_DEVICES,
  LOCK_TOGGLE,
  RESPONSE_ERROR,
  SAVE_DEVICES, SAVE_TYPES,
} from '../actionTypes'
import sendRequest from '../endpointsAPI'

function* getDevicesSaga(payload) {
  try {
    const response = yield sendRequest(payload.type, payload.payload)

    const saveAction = () => {
      if (payload.type === GET_DEVICES) {
        return SAVE_DEVICES
      }

      if (payload.type === GET_SUPPORTED_DEVICES) {
        return SAVE_TYPES
      }
    }

    yield put({ type: saveAction(), payload: response.data })
  } catch (error) {
    yield put({ type: RESPONSE_ERROR, error })
  }
}

function* lockToggleSaga(payload) {
  try {
    yield sendRequest(LOCK_TOGGLE, payload.payload)
  } catch (error) {
    yield put({ type: RESPONSE_ERROR, error })
  }
}

function* addDevicesSaga(payload) {
  try {
    yield sendRequest(payload.type, payload.payload)

    yield put({ type: GET_DEVICES, payload: payload.payload.homeId })
  } catch (error) {
    yield put({ type: RESPONSE_ERROR, error })
  }
}

export default function* watchDevicesSaga() {
  yield takeLatest([GET_DEVICES, GET_SUPPORTED_DEVICES], getDevicesSaga)
  yield takeLatest(LOCK_TOGGLE, lockToggleSaga)
  yield takeLatest(ADD_DEVICES, addDevicesSaga)
}
