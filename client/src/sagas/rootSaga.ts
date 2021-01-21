import { fork } from 'redux-saga/effects';
import watchUserAuthentication from "./userSaga";
import watchHomeAuthentication from "./homeSaga";

export default function* rootSaga() {
    yield fork(watchUserAuthentication);
    yield fork(watchHomeAuthentication);
}