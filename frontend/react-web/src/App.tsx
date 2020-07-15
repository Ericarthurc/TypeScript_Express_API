import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';

// Componenets
import Login from './components/Login';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/login" component={Login}></Route>
          <Route exact path="/main">
            <div style={{ color: 'red' }}>main page</div>
          </Route>
          <Redirect to="/login" />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
