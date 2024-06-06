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

export const PostContainer = styled.div`
  width: 100%;
  max-width: 1100px;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
`;

export const PostTitleBox = styled.div`
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 10px;
`;

export const PostMetaBox = styled.div`
  background-color: #f1f1f1;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 10px;
`;

export const PostMeta = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const PostContentBox = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  height: 300px;
`;

export const PostActions = styled.div`
  margin-top: 20px;

  button {
    padding: 10px 15px;
    margin-right: 10px;
    background-color: #5060ff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
  }

  button:hover {
    background-color: #4050d4;
  }
`;

export const AnswersSection = styled.div`
  margin-top: 20px;
`;

export const AnswersHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;

  h3 {
    margin: 0;
  }

  button {
    padding: 10px 15px;
    background-color: #5060ff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;

    &:hover {
      background-color: #4050d4;
    }
  }
`;

export const AnswerBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;

  textarea {
    width: calc(100% - 10px);
    padding: 8px;
    margin-top: 5px;
    border: 1px solid #ddd;
    border-radius: 4px;
    height: 80px;
  }

  button {
    margin-top: 10px;
    padding: 10px 15px;
    background-color: #5060ff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;

    &:hover {
      background-color: #4050d4;
    }
  }
`;

export const AnswerItem = styled.div`
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 10px;
  margin-bottom: 10px;
  background-color: #f9f9f9;
`;

export const AnswerMeta = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const AnswerActions = styled.div`
  margin-top: 10px;

  button {
    padding: 8px 12px;
    margin-right: 10px;
    background-color: #5060ff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 12px;

    &:hover {
      background-color: #4050d4;
    }
  }
`;
