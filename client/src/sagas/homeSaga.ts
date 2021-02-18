import { put, takeLatest } from 'redux-saga/effects'
import {
  APP_READY,
  CREATE_HOME,
  GET_DEVICES,
  GET_HOME_LIST,
  JOIN_HOME,
  REMOVE_DEVICES,
  REMOVE_HOME_DATA,
  RESPONSE_ERROR,
  SAVE_HOME,
  SAVE_HOME_LIST,
  SELECT_ANOTHER_HOME,
  SELECT_HOME,
} from '../actionTypes'
import sendRequest from '../endpointsAPI'

function* getHomeListSaga(payload) {
  try {
    const response = yield sendRequest(GET_HOME_LIST, payload.payload)

    yield put({ type: SAVE_HOME_LIST, payload: response.data })
  } catch (error) {
    yield put({ type: RESPONSE_ERROR, error })
  }
}

function* selectHomeSaga(payload) {
  const response = yield sendRequest(SELECT_HOME, payload.payload)
  localStorage.setItem('homeId', response.data.id)

  yield put({ type: SAVE_HOME, payload: response.data })
  yield put({ type: GET_DEVICES, payload: { homeId: response.data.id.toString() } })
  yield put({ type: APP_READY })
}

function* createHomeSaga(payload) {
  try {
    const response = yield sendRequest(CREATE_HOME, payload.payload)

    yield put({ type: SAVE_HOME, payload: response.data })
  } catch (error) {
    yield put({ type: RESPONSE_ERROR, error })
  }
}

function* joinHomeSaga(payload) {
  try {
    const response = yield sendRequest(JOIN_HOME, payload.payload)

    yield put({ type: SAVE_HOME, payload: response.data })
  } catch (error) {
    yield put({ type: RESPONSE_ERROR, error })
  }
}

function* selectAnotherHomeSaga() {
  localStorage.removeItem('homeId')

  yield put({ type: REMOVE_HOME_DATA })
  yield put({ type: REMOVE_DEVICES })
}

export default function* watchHomeAuthentication() {
  yield takeLatest(GET_HOME_LIST, getHomeListSaga)
  yield takeLatest(SELECT_HOME, selectHomeSaga)
  yield takeLatest(CREATE_HOME, createHomeSaga)
  yield takeLatest(JOIN_HOME, joinHomeSaga)
  yield takeLatest(SELECT_ANOTHER_HOME, selectAnotherHomeSaga)
}
