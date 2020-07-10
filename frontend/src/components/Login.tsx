import React from "react";
import { Formik, useFormik, ErrorMessage } from "formik";
import axios from "axios";

// Module imports
import styled from "styled-components";
import { Form, Input, Title, Button, Text } from "../styles/themes";

// Login Functional Component
const Login = () => {
  return (
    <LoginContainer>
      <Title>LOGIN PAGE</Title>
      <Formik
        initialValues={{ username: "", password: "" }}
        validate={(values) => {
          const errors: any = {};
          if (!values.username) {
            errors.username = "Required";
          }
          return errors;
        }}
        onSubmit={async (values, { setErrors }) => {
          try {
            const user = await axios.post("/api/v1/users/login", values);
            console.log(user);
          } catch (error) {
            setErrors({ password: "Bad Credentials" });
          }
        }}
      >
        {(props) => (
          <Form onSubmit={props.handleSubmit}>
            <Input
              type="text"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.username}
              name="username"
            />
            {props.errors.username && (
              <div id="feedback">
                <Text>{props.errors.username}</Text>
              </div>
            )}
            <Input
              type="password"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.password}
              name="password"
            />
            {props.errors.password && (
              <div id="feedback">
                <Text>{props.errors.password}</Text>
              </div>
            )}
            <Button type="submit">Submit</Button>
          </Form>
        )}
      </Formik>
    </LoginContainer>
  );
};
// Styled Components
const LoginContainer = styled.div``;

export default Login;
