import {createStore, applyMiddleware, combineReducers} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/rootSaga';
import app from "./reducers/appReducer";
import user from "./reducers/userReducer";
import home from "./reducers/homeReducer";
import devices from "./reducers/devicesReducer";

const reducers = combineReducers({
    app,
    user,
    home,
    devices
});

const sagaMiddleware = createSagaMiddleware();

const middlewares = composeWithDevTools(
    applyMiddleware(sagaMiddleware),
);

export const store = createStore(reducers, middlewares);

sagaMiddleware.run(rootSaga);
