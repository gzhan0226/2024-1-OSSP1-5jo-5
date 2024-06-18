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

export const Tabs = styled.div`
  width: 100%;
  display: flex;
  max-width: 1500px;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const TabButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
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
  width: 80%;
  min-height: 630px;
  margin-top: 20px;
`;

export const PostItem = styled.div`
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: white;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  div {
    flex: 1;
  }

  h4 {
    margin: 0 0 10px;
    font-size: 18px;
    color: #333;
  }

  p {
    margin: 0;
    font-size: 14px;
    color: #777;
  }
`;

export const PostDetails = styled.div`
  text-align: right;
  flex-shrink: 0;

  p {
    margin: 0;
    font-size: 12px;
    color: #aaa;
  }
`;

export const Pagination = styled.div`
  width: 80%;
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

export const ApiName = styled.div`
  display: inline-block;
  background-color: #f0f0f5;
  padding: 5px 15px;
  border-radius: 20px;
  font-weight: bold;
  color: #5060FF;
  margin-bottom: 10px;
  font-size: 12px;
`;

export const Username = styled.p`
  font-size: 12px;
  color: #5060FF;
  margin-top: 10px;
  font-weight: bold;
`;
