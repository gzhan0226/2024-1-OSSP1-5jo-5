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

export const Container = styled.div`
  width: 100%;
  max-width: 1400px;
  background-color: #FFFFFF;
  padding: 40px;
  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  border: 1px solid #8A94FF;
`;

export const TitleInput = styled.input`
  width: 60%;
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 18px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  transition: border-color 0.3s ease;
  &:focus {
    border-color: #5060FF;
  }
`;

export const ApiNameInput = styled.input`
  width: 40%;
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 18px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  transition: border-color 0.3s ease;
  &:focus {
    border-color: #5060FF;
  }
`;

export const ContentInput = styled.textarea`
  width: 80%;
  height: 400px;
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 18px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  transition: border-color 0.3s ease;
  &:focus {
    border-color: #5060FF;
  }
`;

export const BoardTypeButtons = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

export const BoardTypeButton = styled.button`
  flex: none;
  padding: 10px 20px;
  margin-right: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: ${props => props.active ? '#5060FF' : 'white'};
  color: ${props => props.active ? 'white' : 'black'};
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease, color 0.3s ease;
  &:hover {
    background-color: ${props => props.active ? '#4050D4' : '#f0f0f0'};
  }
`;

export const SubmitButton = styled.button`
  align-self: flex-start;
  padding: 10px 20px;
  background-color: #5060FF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #4050D4;
  }
`;
