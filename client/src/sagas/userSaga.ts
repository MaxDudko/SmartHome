import { put, takeLatest } from 'redux-saga/effects'
import {
  APP_READY,
  LOGIN_USER,
  LOGOUT_USER, REFRESH_PASSWORD,
  REGISTER_USER,
  REMOVE_DEVICES,
  REMOVE_HOME_DATA,
  REMOVE_USER_DATA, RESET_PASSWORD,
  RESPONSE_ERROR,
  SAVE_USER_DATA,
  SELECT_HOME,
  VALIDATE_TOKEN,
} from '../actionTypes'
import sendRequest from '../endpointsAPI'

function* tokenValidationSaga(payload) {
  try {
    const response = yield sendRequest(VALIDATE_TOKEN, { token: payload.token })
    yield put({ type: SAVE_USER_DATA, payload: response.data.user })

    const userId = response.data.user.id.toString()
    const homeId = localStorage.getItem('homeId')
    if (userId && homeId) {
      yield put({
        type: SELECT_HOME,
        payload: {
          userId: response.data.user.id.toString(),
          homeId: localStorage.getItem('homeId'),
        },
      })
    } else {
      yield put({ type: APP_READY })
    }
  } catch (error) {
    localStorage.removeItem('token')
    localStorage.removeItem('homeId')

    yield put({ type: APP_READY })
  }
}

function* loginSaga(payload) {
  try {
    const response = yield sendRequest(LOGIN_USER, { ...payload.data })
    localStorage.setItem('token', `Bearer ${response.data.user.token}`)

    yield put({ type: SAVE_USER_DATA, payload: response.data.user })
  } catch (error) {
    yield put({ type: RESPONSE_ERROR, payload: error.response.data.message })
  }
}

function* registerSaga(payload) {
  try {
    const response = yield sendRequest(REGISTER_USER, { ...payload.data })
    localStorage.setItem('token', `Bearer ${response.data.user.token}`)

    yield put({ type: SAVE_USER_DATA, payload: response.data.user })
  } catch (error) {
    yield put({ type: RESPONSE_ERROR, payload: error.response.data.message })
  }
}

function* resetPasswordSaga(payload) {
  try {
    yield sendRequest(RESET_PASSWORD, { ...payload.data })
  } catch (error) {
    yield put({ type: RESPONSE_ERROR, payload: error.response.data.message })
  }
}

function* refreshPasswordSaga(payload) {
  try {
    const response = yield sendRequest(REFRESH_PASSWORD, { ...payload.data })
    localStorage.setItem('token', `Bearer ${response.data.user.token}`)
  } catch (error) {
    yield put({ type: RESPONSE_ERROR, payload: error.response.data.message })
  }
}

function* logoutSaga() {
  localStorage.removeItem('token')
  localStorage.removeItem('homeId')

  yield put({ type: REMOVE_USER_DATA })
  yield put({ type: REMOVE_HOME_DATA })
  yield put({ type: REMOVE_DEVICES })
}

export default function* watchUserAuthentication() {
  yield takeLatest(VALIDATE_TOKEN, tokenValidationSaga)
  yield takeLatest(LOGIN_USER, loginSaga)
  yield takeLatest(RESET_PASSWORD, resetPasswordSaga)
  yield takeLatest(REFRESH_PASSWORD, refreshPasswordSaga)
  yield takeLatest(REGISTER_USER, registerSaga)
  yield takeLatest(LOGOUT_USER, logoutSaga)
}
