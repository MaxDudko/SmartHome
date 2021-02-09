import { fork } from 'redux-saga/effects'
import watchDevicesSaga from './devicesSaga'
import watchHomeAuthentication from './homeSaga'
import watchUserAuthentication from './userSaga'

export default function* rootSaga() {
  yield fork(watchUserAuthentication)
  yield fork(watchHomeAuthentication)
  yield fork(watchDevicesSaga)
}
