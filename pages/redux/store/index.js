import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import {exampleInitialState} from '../example-initial-state.js'
import rooterReducer from '../reducers';

export function initializeStore (initialState = exampleInitialState) {
  return createStore(
    rooterReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  )
}