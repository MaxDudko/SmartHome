import {AnyAction} from "redux";
import { all, takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

const API = 'http://localhost:4000/';

function* getData(action: AnyAction): Generator {
    let data;
    yield axios.post(`${API}${action.payload.path}`, {
        'id': action.payload.id,
        'i': action.payload.i,
    })
        .then((response) => {
            data = response.data;
        });
    yield put({ type: action.payload.typed, payload: data });
}

function* updateData(action: AnyAction): Generator {
    if(!action.payload.id) return;
    yield axios.post(`${API}${action.payload.path}`, {
        'user': {
            'id': action.payload.id,
            'data': {
                ...action.payload.data
            }
        }
    });
    yield put({ type: action.payload.typed, payload: action.payload });
}

export default function* rootSaga(): Generator {
    yield all([
        // yield takeEvery('UPDATE_DATA', updateData),
        // yield takeEvery('GET_GAMES', getData),
        // yield takeEvery('GET_SCORES', getData),
    ]);
}