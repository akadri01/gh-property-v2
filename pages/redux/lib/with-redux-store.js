import React, { Component } from "react";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import rooterReducer from "../reducers";
const reduxInitialState = {
  user: []
};

const initializeStore = (initialState = reduxInitialState) => {
  return createStore(
    rooterReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  );
};

const getOrCreateStore = initialState => {
  if (typeof window === "undefined") {
    return initializeStore(initialState);
  }
  const __NEXT_REDUX_STORE__ = "__NEXT_REDUX_STORE__";
  if (!window[__NEXT_REDUX_STORE__]) {
    window[__NEXT_REDUX_STORE__] = initializeStore(initialState);
  }
  return window[__NEXT_REDUX_STORE__];
};

export default App => {
  return class AppWithRedux extends Component {
    static async getInitialProps(appContext) {
      const reduxStore = getOrCreateStore();
      appContext.ctx.reduxStore = reduxStore;
      let appProps = {};
      if (typeof App.getInitialProps === "function") {
        appProps = await App.getInitialProps(appContext);
      }
      return {
        ...appProps,
        initialReduxState: reduxStore.getState()
      };
    }
    constructor(props) {
      super(props);
      this.reduxStore = getOrCreateStore(props.initialReduxState);
    }
    render() {
      return <App {...this.props} reduxStore={this.reduxStore} />;
    }
  };
};
