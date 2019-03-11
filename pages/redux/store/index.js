import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import {reduxInitialState} from '../redux-initial-state';
import rooterReducer from '../reducers';

export function initializeStore (initialState = reduxInitialState) {
  return createStore(
    rooterReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  )
}