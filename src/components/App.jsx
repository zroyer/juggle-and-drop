// @flow
import * as React from "react";
import { Fragment} from "react";
import { Route } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import Board from "./Board/Board";
import "./App.scss";

const App = () => (
  <Fragment>
    <Header />
    <Route exact path="/" component={Home} />
    <Route path="/b/:boardId" component={Board} />
  </Fragment>
);

export default App;
