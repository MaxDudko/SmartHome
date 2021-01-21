import {call, put, takeLatest} from "redux-saga/effects";
import {} from "../services/auth";

function* homeSaga(payload) {
    try {
        // const response = yield call(someservice, payload);
        // yield put({ type: '', payload: response.data });
    } catch(error) {
        yield put({ type: '', error })
    }
}

export default function* watchHomeAuthentication() {
    yield takeLatest('', homeSaga);
}