import { fork } from 'redux-saga/effects';
import watchUserAuthentication from "./userSaga";

export default function* rootSaga() {
    yield fork(watchUserAuthentication);
}