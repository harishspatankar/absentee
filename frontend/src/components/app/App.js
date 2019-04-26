/* eslint-disable no-undef */
import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import AppLayout from '../layout/AppLayout';
import DashBoardLayout from '../layout/DashBoardLayout';


const App = () => (
  <div className="App">
    <Router>
      <div>
        <Route exact path="/login" component={AppLayout} />
        <Route path="/" component={DashBoardLayout} />
      </div>
    </Router>
  </div>
);

export default App;
