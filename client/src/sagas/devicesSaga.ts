import { call, put, takeLatest } from 'redux-saga/effects'
import { getDevicesService, lockToggleService } from '../services/devicesServices'

function* getDevicesSaga(payload) {
  try {
    const response = yield call(getDevicesService, payload)
    yield put({ type: 'SAVE_DEVICES_ACTION', payload: response.data })
  } catch (error) {
    yield put({ type: 'RESPONSE_ERROR', error })
  }
}

function* lockToggleSaga(payload) {
  try {
    const response = yield call(lockToggleService, payload)
    yield put({ type: 'SAVE_DEVICES_ACTION', payload: response.data })
  } catch (error) {
    yield put({ type: 'RESPONSE_ERROR', error })
  }
}

export default function* watchDevicesSaga() {
  yield takeLatest('GET_DEVICES_ACTION', getDevicesSaga)
  yield takeLatest('LOCK_TOGGLE_ACTION', lockToggleSaga)
}
