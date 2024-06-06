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
  background-color: rgb(245,245,251);
`;

export const MainContent = styled.div`
  width: 100%;
  padding: 20px;
  background-color: rgb(245,245,251);
  margin-left: -30px;
`;

export const Tabs = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  width: 100%;
`;

export const TabButton = styled.button`
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  background-color: ${({ active }) => (active ? '#8A94FF' : 'white')};
  color: ${({ active }) => (active ? 'white' : 'black')};
  margin-right: 10px;
`;

export const WriteButton = styled.button`
  padding: 10px 15px;
  background-color: #5060FF;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  align-self: flex-end;

  &:hover {
    background-color: #4050d4;
  }
`;

export const PostsList = styled.div`
  margin-top: 20px;
`;

export const PostItem = styled.div`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  div {
    flex: 1;
  }
`;

export const PostDetails = styled.div`
  text-align: right;
  flex-shrink: 0;

  p {
    margin: 0;
  }
`;

export const Pagination = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;

export const PaginationButton = styled.button`
  padding: 5px 10px;
  border: 1px solid #ccc;
  margin: 0 2px;
  cursor: pointer;
  background-color: ${({ active }) => (active ? '#5060FF' : 'white')};
  color: ${({ active }) => (active ? 'white' : 'black')};

  &:hover {
    background-color: #4050d4;
    color: white;
  }
`;
