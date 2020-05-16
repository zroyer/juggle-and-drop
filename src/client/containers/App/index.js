import React from 'react';
import {Route} from 'react-router-dom';
import {createGlobalStyle} from 'styled-components';
import ReactGA from 'react-ga';
import Home from '../Home';
import Board from '../Board';
import Header from '../../components/Header';
console.log(process.env.NODE_ENV === 'development');
ReactGA.initialize('UA-166871159-1', {
  debug: process.env.NODE_ENV === 'development',
  gaOptions: {env: process.env.NODE_ENV}
});
ReactGA.pageview('/');

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    overflow-x: auto;
    color: rgb(46, 68, 78);
    background-image: linear-gradient(to top, rgb(118, 75, 162) 0%, rgb(102, 126, 234) 100%);
    min-height: 100vh;
    font-family: Helvetica Neue, Arial, Helvetica, sans-serif;
  }
  a:-webkit-any-link {
    text-decoration: none;
    text-decoration-color: none;
    color: rgb(46, 68, 78);
  }
  :focus {
    outline: none;
  }
`;

const App = () => (
  <React.Fragment>
    <GlobalStyle />
    <Header />
    <Route exact path="/" component={Home} />
    <Route path="/board/:boardId" component={Board} />
  </React.Fragment>
);

export default App;
