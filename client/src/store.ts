import {createStore, applyMiddleware, combineReducers} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/rootSaga';
import user from "./reducers/userReducer";
import app from "./reducers/appReducer";

const reducers = combineReducers({
    user,
    app
});

const sagaMiddleware = createSagaMiddleware();

// const reduxDevTools = (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__();
// const devTools = process.env.NODE_ENV === 'development' ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : null;

const middlewares = composeWithDevTools(
    applyMiddleware(sagaMiddleware),
);

export const store = createStore(reducers, middlewares);

sagaMiddleware.run(rootSaga);
