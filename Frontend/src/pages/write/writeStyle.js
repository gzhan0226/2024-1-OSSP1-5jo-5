import styled from 'styled-components';

export const AppContainer = styled.div`
  display: flex;
  font-family: Arial, sans-serif;
`;

export const MainContentWrapper = styled.div`
  width: 80%;
  margin-left: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgb(245, 245, 251);
`;

export const MainContent = styled.div`
  width: 100%;
  padding: 20px;
  background-color: rgb(245, 245, 251);
  margin-left: -30px;
`;

export const Container = styled.div`
  width: 100%;
  max-width: 1000px;
  background-color: #FFFFFF;
  padding: 40px;
  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

export const TitleInput = styled.input`
  width: 50%;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

export const ApiNameInput = styled.input`
  width: 50%;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

export const ContentInput = styled.textarea`
  width: 100%;
  height: 600px;
  margin-bottom: 10px;
  margin-right: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

export const BoardTypeButtons = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

export const BoardTypeButton = styled.button`
  flex: none;
  padding: 5px 10px;
  margin-right: 5px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: ${props => props.active ? '#8A94FF' : 'white'};
  color: ${props => props.active ? 'white' : 'black'};
  cursor: pointer;
`;

export const SubmitButton = styled.button`
  align-self: flex-start;
  padding: 5px 10px;
  background-color: #5060FF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #4050cc;
  }
`;
