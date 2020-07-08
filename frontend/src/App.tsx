import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';

import axios from 'axios';

import styled from 'styled-components';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact>
            <Login />
          </Route>
          <Route path="/main" exact>
            <div style={{ color: 'red' }}>main page</div>
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

const Title = styled.h1`
  color: red;
`;

const Login = () => {
  const formHandler = async (e: any) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    try {
      const data = await axios.post('/api/v1/users/login', {
        username,
        password,
      });
      console.log(data);
    } catch (error) {}
  };

  return (
    <div>
      <Title>LOGIN PAGE</Title>
      <form onSubmit={formHandler}>
        <input type="text" name="username"></input>
        <input type="password" name="password"></input>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default App;
