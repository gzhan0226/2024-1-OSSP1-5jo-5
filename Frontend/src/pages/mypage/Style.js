import styled from "styled-components";

export const Container = styled.div`
  background-color: rgb(245, 245, 251);
  width: 83vw;
  min-height: 100vh;
  padding-bottom: 130px;
`;

export const Profile = styled.div`
  background-color: white;
  width: 26%;
  height: fit-content;
  margin-left: 120px;
  margin-top: 50px;
  border-radius: 16px;
  padding: 20px 40px;
`;

export const Rdiv = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Cdiv = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Level = styled.div`
  width: 100%;
  height: 30px;
  background-color: #c6c7f8;
  margin-left: 40px;
  border-radius: 8px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const UserContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
`;

export const UserItem = styled.div`
  text-align: center;
  flex: 1;
  border-right: 1px solid #ccc;
  padding: ${(props) => (props.first ? "0px 50px 0px 0px" : "0px 50px")};
  white-space: nowrap;

  &:first-child {
    padding-left: 0;
  }

  &:last-child {
    border-right: none;
  }
`;

export const UserLabel = styled.div`
  font-size: 20px;
  margin-bottom: 5px;
  font-weight: normal;
`;

export const UserValue = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

export const ApiBox = styled.div`
  width: 80%;
  height: fit-content;
  padding: 30px 50px;
  background-color: white;
  margin-top: 50px;
  margin-left: 120px;
  border-radius: 16px;
`;

export const Title = styled.p`
  color: #5060ff;
  margin: 0px 0px;
  font-size: 23px;
  font-weight: 600;
`;

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 30px;
`;

export const CardGridItem = styled.div`
  display: flex;
  justify-content: center;
`;

export const More = styled.p`
  color: #5060ff;
  font-size: 23px;
  font-weight: 600;
  margin-left: auto;
  cursor: pointer;
`;

export const ApiBoxHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const ForumContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 100px 120px 0px 100px;
`;

export const ForumBox = styled.div`
  width: 45%;
  height: fit-content;
  padding: 10px 30px;
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const ForumHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

export const QuestionItem = styled.div`
  border-bottom: 1px solid #ccc;
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:last-child {
    border-bottom: none;
  }
`;

export const QuestionTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

export const QuestionContent = styled.div`
  font-size: 14px;
  color: #666;
`;

export const QuestionDate = styled.div`
  font-size: 12px;
  color: #999;
`;

export const PostItem = styled.div`
  padding: 20px;
  width: 70%;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: white;
  transition: transform 0.2s, box-shadow 0.2s;
  margin-left: auto;
  margin-right: auto;
  margin-top: 30px;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  div {
    flex: 1;
  }

  h4 {
    margin-top: 0px;
    font-size: 18px;
    color: #333;
  }

  p {
    margin: 0;
    font-size: 14px;
    color: #777;
  }
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5%;

  button {
    margin: 0 10px;
    padding: 10px 20px;
    border: 1px solid #ccc;
    background-color: #fff;
    cursor: pointer;
    border-radius: 5px;
    font-size: 16px;
    transition: background-color 0.3s, color 0.3s, border-color 0.3s;

    &:hover {
      background-color: #f0f0f0;
      border-color: #999;
    }

    &:active {
      background-color: #e0e0e0;
      border-color: #666;
    }
  }

  span {
    margin: 0 10px;
    font-size: 16px;
  }
`;
