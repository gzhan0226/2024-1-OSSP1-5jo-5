import styled from 'styled-components';

export const SignUpContainer = styled.div`
  background: linear-gradient(to right, #5060FF, #8A94FF);
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const Title = styled.h1`
  color: white;
  font-size: 24px;
  margin-bottom: 20px;
`;

export const Form = styled.div`
  padding: 30px;
  border-radius: 10px;
  width: 320px;
  text-align: center;
  background: transparent;
`;

export const InputGroup = styled.div`
  margin-bottom: 20px;
  text-align: left;
  width: 100%;
`;

export const InputField = styled.input`
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-sizing: border-box;
`;

export const UsernameField = styled.div`
  display: flex;
  align-items: center;
  margin: 5px 0;
  width: 100%;
`;

export const UsernameInput = styled.input`
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-sizing: border-box;
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #5060FF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
`;

export const Label = styled.div`
  color: white;
  font-size: 14px;
  margin: 5px 0 0;
  text-align: left;
`;
