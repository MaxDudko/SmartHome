import axios from 'axios'
import { put, takeLatest } from 'redux-saga/effects'
const SMART_APP_ENDPOINT = '/smart-api'

function* getDevicesSaga(payload) {
  try {
    const API_ENDPOINT = `${process.env.REACT_APP_API_URL}${SMART_APP_ENDPOINT}/get-devices`
    const response = yield axios.post(API_ENDPOINT, payload.payload)

    yield put({ type: 'SAVE_DEVICES_ACTION', payload: response.data })
  } catch (error) {
    yield put({ type: 'RESPONSE_ERROR', error })
  }
}

function* lockToggleSaga(payload) {
  try {
    const API_ENDPOINT = `${process.env.REACT_APP_API_URL}${SMART_APP_ENDPOINT}/lock-toggle`
    const homeId = localStorage.getItem('homeId')
    yield axios.post(API_ENDPOINT, payload.payload)

    yield put({ type: 'GET_DEVICES_ACTION', payload: { homeId: homeId && homeId.toString() } })
  } catch (error) {
    yield put({ type: 'RESPONSE_ERROR', error })
  }
}

export default function* watchDevicesSaga() {
  yield takeLatest('GET_DEVICES_ACTION', getDevicesSaga)
  yield takeLatest('LOCK_TOGGLE_ACTION', lockToggleSaga)
}
