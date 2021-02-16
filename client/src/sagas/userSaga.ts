import axios from 'axios'
import { put, takeLatest } from 'redux-saga/effects'

function* tokenValidationSaga(payload) {
  try {
    const API_ENDPOINT = `${process.env.REACT_APP_API_URL}/profile`
    const response = yield axios.post(API_ENDPOINT, { token: payload.token })

    yield put({ type: 'SAVE_USER_DATA', payload: response.data.user })
  } catch (error) {
    localStorage.removeItem('token')
    localStorage.removeItem('homeId')

    yield put({ type: 'VALIDATE_TOKEN_ERROR', error })
  }
}

function* loginSaga(payload) {
  try {
    const REGISTER_API_ENDPOINT = `${process.env.REACT_APP_API_URL}/login`
    const response = yield axios.post(REGISTER_API_ENDPOINT, { ...payload.data })
    localStorage.setItem('token', response.data.user.token)

    yield put({ type: 'SAVE_USER_DATA', payload: response.data.user })
  } catch (error) {
    yield put({ type: 'RESPONSE_ERROR', payload: error.response.data.errors.message })
  }
}

function* registerSaga(payload) {
  try {
    const REGISTER_API_ENDPOINT = `${process.env.REACT_APP_API_URL}/register`
    const response = yield axios.post(REGISTER_API_ENDPOINT, { ...payload.data })
    localStorage.setItem('token', response.data.user.token)

    yield put({ type: 'SAVE_USER_DATA', payload: response.data.user })
  } catch (error) {
    yield put({ type: 'RESPONSE_ERROR', payload: error.response.data.errors.message })
  }
}

function* logoutSaga() {
  try {
    localStorage.removeItem('token')
    localStorage.removeItem('homeId')

    yield put({ type: 'REMOVE_HOME_DATA' })
    yield put({ type: 'REMOVE_DEVICES_ACTION' })
    yield put({ type: 'REMOVE_USER_DATA' })
  } catch (error) {
    yield put({ type: 'LOGOUT_USER_ERROR', error })
  }
}

export default function* watchUserAuthentication() {
  yield takeLatest('VALIDATE_TOKEN', tokenValidationSaga)
  yield takeLatest('LOGIN_USER', loginSaga)
  yield takeLatest('REGISTER_USER', registerSaga)
  yield takeLatest('LOGOUT_USER', logoutSaga)
}
