import { put, takeLatest } from 'redux-saga/effects'
import { GET_DEVICES, LOCK_TOGGLE, RESPONSE_ERROR, SAVE_DEVICES } from '../actionTypes'
import sendRequest from '../endpointsAPI'

function* getDevicesSaga(payload) {
  try {
    const response = yield sendRequest(GET_DEVICES, payload.payload)

    yield put({ type: SAVE_DEVICES, payload: response.data })
  } catch (error) {
    yield put({ type: RESPONSE_ERROR, error })
  }
}

function* lockToggleSaga(payload) {
  try {
    const homeId = localStorage.getItem('homeId')
    yield sendRequest(LOCK_TOGGLE, payload.payload)

    yield put({ type: GET_DEVICES, payload: { homeId: homeId && homeId.toString() } })
  } catch (error) {
    yield put({ type: RESPONSE_ERROR, error })
  }
}

export default function* watchDevicesSaga() {
  yield takeLatest(GET_DEVICES, getDevicesSaga)
  yield takeLatest(LOCK_TOGGLE, lockToggleSaga)
}
