import { call, put, takeLatest } from 'redux-saga/effects'
import {
  loginUserService,
  registerUserService,
  tokenValidationService,
} from '../services/userServices'

function* tokenValidationSaga(payload) {
  try {
    const response = yield call(tokenValidationService, payload)
    yield put({ type: 'SAVE_USER_DATA', payload: response.data.user })
  } catch (error) {
    yield put({ type: 'VALIDATE_TOKEN_ERROR', error })
  }
}

function* loginSaga(payload) {
  try {
    const response = yield call(loginUserService, payload)
    yield put({ type: 'SAVE_USER_DATA', response })
  } catch (error) {
    yield put({ type: 'LOGIN_USER_ERROR', error })
  }
}

function* registerSaga(payload) {
  try {
    const response = yield call(registerUserService, payload)
    yield put({ type: 'SAVE_USER_DATA', response })
  } catch (error) {
    yield put({ type: 'REGISTER_USER_ERROR', error })
  }
}

function* logoutSaga(payload) {
  try {
    localStorage.removeItem('token')
    localStorage.removeItem('homeId')
    window.location.reload()
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
