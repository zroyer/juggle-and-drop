import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import App from '../client/containers/App';
import reducers from '../client/reducers/reducers';

export default function renderPage(req, res) {
  const store = createStore(
    combineReducers(reducers),
    req.initialState,
    applyMiddleware(thunk)
  );

  const context = {};

  const renderedApp = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        <App />
      </StaticRouter>
    </Provider>
  );

  const preloadedState = store.getState();
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="google" content="notranslate">
        <link rel="icon" type="image/png" href="/static/favicons/favicon-32x32.png" sizes="32x32" />
        <link rel="icon" type="image/png" href="/static/favicons/favicon-16x16.png" sizes="16x16" />
        <link rel="stylesheet" href="/static/bundle.css">
      </head>
      <body>
        <div id="app">${renderedApp}</div>
      </body>
      <script>
        window.PRELOADED_STATE = ${JSON.stringify(preloadedState)}
      </script>
      <script src="/static/bundle.js"></script>
    </html>
  `;

  res.send(html);
}
