import { fork } from 'redux-saga/effects';
import watchUserAuthentication from "./userSaga";
import watchHomeAuthentication from "./homeSaga";
import watchDevicesSaga from "./devicesSaga";

export default function* rootSaga() {
    yield fork(watchUserAuthentication);
    yield fork(watchHomeAuthentication);
    yield fork(watchDevicesSaga);
}