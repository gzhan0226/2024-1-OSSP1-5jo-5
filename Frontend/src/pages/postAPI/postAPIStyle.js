import styled from 'styled-components';

export const AppContainer = styled.div`
  display: flex;
  font-family: Arial, sans-serif;
`;

export const MainContentWrapper = styled.div`
  width: 100%;
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgb(245, 245, 251);
`;  

export const MainContent = styled.div`
  width: 120%;
  padding: 20px;
  background-color: rgb(245, 245, 251 );
  margin-left: 360px;
`;

export const FormContainer = styled.div`
  width: 100%;
  max-width: 1400px;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 10px;
    display: block;
  }

  textarea {
    width: 90%;
    height: 200px;
  }

  input[type="text"], select {
    width: 30%;
    padding: 8px;
    margin-top: 5px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  select {
    width: 10%;
  }
`;

export const RadioGroup = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 10px;

  label {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 12px;
    white-space: nowrap;
  }
`;

export const Item = styled.div`
  width: 40%;
  display: flex;
  justify-between: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 5px;

  span {
    flex-grow: 1;
  }

  button {
    padding: 5px 10px;
    background-color: #5060ff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    margin-left: 5px;
    margin-right: 5px;
  }
`;

export const SubmitButton = styled.button`
  margin-top: 20px;
  padding: 5px 10px;
  background-color: #5060FF;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  align-self: flex-start;

  &:hover {
    background-color: #4050d4;
  }
`;
