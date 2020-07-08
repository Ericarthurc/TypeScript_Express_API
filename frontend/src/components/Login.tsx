import React from 'react';

// Module imports
import styled from 'styled-components';

const Login = () => {
  return (
    <LoginContainer>
      <Title>LOGIN PAGE</Title>
      <form onSubmit={}>
        <input type="text" name="username"></input>
        <input type="password" name="password"></input>
        <button type="submit">Login</button>
      </form>
    </LoginContainer>
  );
};

// Styled Components
const LoginContainer = styled.div``;

const Title = styled.h1`
  color: red;
`;

export default Login;
