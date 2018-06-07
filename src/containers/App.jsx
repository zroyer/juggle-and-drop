// @flow
import * as React from 'react';
import { Route } from 'react-router-dom';
import { injectGlobal } from 'styled-components';
import Home from './Home';
import Board from './Board';
import Header from '../components/Header';

injectGlobal`
  body {
    margin: 0;
    overflow-x: auto;
    overflow-y: hidden;
    color: rgb(46, 68, 78);
    background-image: linear-gradient(to top, #764ba2 0%, #667eea 100%);
    min-height: 100vh;
    font-family: Helvetica Neue, Arial, Helvetica, sans-serif;
  }

  :focus {
    outline: none;
  }
`;

const App = () => (
  <React.Fragment>
    <Header />
    <Route exact path="/" component={Home} />
    <Route path="/:boardId" component={Board} />
  </React.Fragment>
);

export default App;
