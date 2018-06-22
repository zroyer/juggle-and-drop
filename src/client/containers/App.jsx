import * as React from 'react';
import { Route } from 'react-router-dom';
import Home from './Home';
import Board from './Board';
import Header from '../components/Header';
import './base.scss';

const App = () => (
  <React.Fragment>
    <Header />
    <Route exact path="/" component={Home} />
    <Route path="/board/:boardId" component={Board} />
  </React.Fragment>
);

export default App;
