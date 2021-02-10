import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'

import createSagaMiddleware from 'redux-saga'
import app from './reducers/appReducer'
import devices from './reducers/devicesReducer'
import home from './reducers/homeReducer'
import user from './reducers/userReducer'
import rootSaga from './sagas/rootSaga'

const reducers = combineReducers({
  app,
  user,
  home,
  devices,
})

const sagaMiddleware = createSagaMiddleware()

const middlewares = composeWithDevTools(applyMiddleware(sagaMiddleware))

export const store = createStore(reducers, middlewares)

sagaMiddleware.run(rootSaga)
