import { fork } from 'redux-saga/effects';
import watchUserAuthentication from "./authSaga";

export default function* rootSaga() {
    yield fork(watchUserAuthentication);
}