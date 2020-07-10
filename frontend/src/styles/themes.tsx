import styled from "styled-components";

// Forms, inputs, buttons

export const Form = styled.form`
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Input = styled.input`
  width: 300px;
  height: 35px;
  border: 1px solid #ccc;
  background: #fff;
`;

export const Button = styled.button`
  width: 300px;
  height: 35px;
  background: #5995ef;
  color: #fff;
  border-radius: 3px;

  &:hover {
    background: #bada55;
  }

  &:focus {
    background: #da5555;
  }
`;

// Text

export const Title = styled.h1`
  font-weight: 600;
  color: #4d4d4d;
  font-size: 2.2em;
`;

export const Title2 = styled.h2`
  font-weight: 300;
  color: #4d4d4d;
  font-size: 1.8em;
`;

export const Text = styled.p`
  color: ${(props) => props.color || "#4d4d4d"};
  margin: 0px;
  padding: 10px 0px;
`;
