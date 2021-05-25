import {
  applyMiddleware,
  combineReducers,
  createStore as _createStore,
} from "redux"
import {composeWithDevTools} from "redux-devtools-extension"
import thunk from "redux-thunk"

import {
  reducer as carInfoReducer,
  CarInfoStore,
} from "./carInfo/reduxDuck/reducer"

function isDebug() {
  return import.meta.env.NODE_ENV === "development"
}

export interface AppState {
  carInfo: CarInfoStore
}

function createRootReducer() {
  return combineReducers({
    carInfo: carInfoReducer,
  })
}

export function createStore() {
  const middlewares = isDebug()
    ? composeWithDevTools(applyMiddleware(thunk))
    : applyMiddleware(thunk)

  return _createStore(createRootReducer(), {}, middlewares)
}
