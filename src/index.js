import React from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import { devToolsEnhancer } from "redux-devtools-extension";
import { BrowserRouter } from "react-router-dom";
import reducers from "./reducers/reducers";
import App from "./containers/App";
import registerServiceWorker from './registerServiceWorker';

const preloadedState = window.PRELOADED_STATE;

delete window.PRELOADED_STATE;

const store = createStore(
  combineReducers(reducers),
  preloadedState,
  devToolsEnhancer()
);


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
