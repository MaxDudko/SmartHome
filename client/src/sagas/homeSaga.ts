import axios from 'axios'
import { put, takeLatest } from 'redux-saga/effects'

function* getHomeListSaga(payload) {
  try {
    const API_ENDPOINT = `${process.env.REACT_APP_API_URL}/find-home`
    const response = yield axios.post(API_ENDPOINT, payload.payload)

    yield put({ type: 'SAVE_HOME_LIST', payload: response.data })
  } catch (error) {
    yield put({ type: 'RESPONSE_ERROR', error })
  }
}

function* selectHomeSaga(payload) {
  try {
    const API_ENDPOINT = `${process.env.REACT_APP_API_URL}/select-home`
    const response = yield axios.post(API_ENDPOINT, payload.payload)

    yield put({ type: 'SAVE_HOME', payload: response.data })
    yield put({ type: 'GET_DEVICES_ACTION', payload: { homeId: response.data.home.id.toString() } })
    yield put({ type: 'APP_READY' })
  } catch (error) {
    yield put({ type: 'APP_READY' })
    yield put({ type: 'RESPONSE_ERROR', error })
  }
}

function* createHomeSaga(payload) {
  try {
    const API_ENDPOINT = `${process.env.REACT_APP_API_URL}/create-home`
    const response = yield axios.post(API_ENDPOINT, payload.payload)

    yield put({ type: 'SAVE_HOME', payload: response.data })
  } catch (error) {
    yield put({ type: 'RESPONSE_ERROR', error })
  }
}

function* joinHomeSaga(payload) {
  try {
    const API_ENDPOINT = `${process.env.REACT_APP_API_URL}/join-home`
    const response = yield axios.post(API_ENDPOINT, payload.payload)

    yield put({ type: 'SAVE_HOME', payload: response.data })
  } catch (error) {
    yield put({ type: 'RESPONSE_ERROR', error })
  }
}

function* selectAnotherHomeSaga() {
  try {
    localStorage.removeItem('homeId')

    yield put({ type: 'REMOVE_HOME_DATA' })
    yield put({ type: 'REMOVE_DEVICES_ACTION' })
  } catch (error) {
    yield put({ type: 'SELECT_ANOTHER_HOME_ERROR', error })
  }
}

export default function* watchHomeAuthentication() {
  yield takeLatest('GET_HOME_LIST', getHomeListSaga)
  yield takeLatest('SELECT_HOME', selectHomeSaga)
  yield takeLatest('CREATE_HOME', createHomeSaga)
  yield takeLatest('JOIN_HOME', joinHomeSaga)
  yield takeLatest('SELECT_ANOTHER_HOME', selectAnotherHomeSaga)
}
