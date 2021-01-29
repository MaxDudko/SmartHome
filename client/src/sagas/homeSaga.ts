import {call, put, takeLatest} from "redux-saga/effects";
import {createHomeService, getHomeListService, joinHomeService, selectHomeService} from "../services/homeServices";

function* getHomeListSaga(payload) {
    try {
        const response = yield call(getHomeListService, payload);
        yield put({ type: 'SAVE_HOME_LIST', payload: response.data });
    } catch(error) {
        yield put({ type: 'RESPONSE_ERROR', error })
    }
}

function* selectHomeSaga(payload) {
    try {
        const response = yield call(selectHomeService, payload);

        yield put({ type: 'SAVE_HOME', payload: response.data });
    } catch(error) {
        console.log(__filename, error)
        yield put({ type: 'RESPONSE_ERROR', error })
    }
}

function* createHomeSaga(payload) {
    try {
        const response = yield call(createHomeService, payload);

        yield put({ type: 'SAVE_HOME', payload: response.data });
    } catch(error) {
        yield put({ type: 'RESPONSE_ERROR', error })
    }
}

function* joinHomeSaga(payload) {
    try {
        const response = yield call(joinHomeService, payload);

        yield put({ type: 'SAVE_HOME', payload: response.data });
    } catch(error) {
        yield put({ type: 'RESPONSE_ERROR', error })
    }
}

export default function* watchHomeAuthentication() {
    yield takeLatest('GET_HOME_LIST', getHomeListSaga);
    yield takeLatest('SELECT_HOME', selectHomeSaga);
    yield takeLatest('CREATE_HOME', createHomeSaga);
    yield takeLatest('JOIN_HOME', joinHomeSaga);
}