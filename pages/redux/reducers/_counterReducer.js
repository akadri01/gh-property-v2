import {exampleInitialState} from '../example-initial-state.js';

const counterReducer = (state = exampleInitialState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return Object.assign({}, state, {
        count: state.count + 1
      })
    case 'DECREMENT':
      return Object.assign({}, state, {
        count: state.count - 1
      })
    default:
      return state
  }
}

export default counterReducer;