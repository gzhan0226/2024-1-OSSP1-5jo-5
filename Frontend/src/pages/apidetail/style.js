//api나타내는 표
import styled from "styled-components";

export const Container = styled.div`
  background-color: rgb(245, 245, 251);
  width: 84vw;
  min-height: 100vh;
`;

export const AboutApi = styled.div`
  margin-top: 3%;
  background-color: white;
  width: 50vw;
  min-height: 20vh;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  padding: 10px;
  border-radius: 10px;
  padding: 20px 20px;
`;

export const Favicon = styled.img`
  width: 100px;
  height: 100px;
`;

export const Example = styled.button`
  background-color: ${(props) => (props.isProvided ? "#00d44c" : "#888888")};
  color: white;
  font-size: 16px;
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  font-weight: bold;
  display: inline-block;
  text-align: center;
  cursor: pointer;
  width: 150px;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
`;

export const HeartButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
  color: ${(props) => (props.isLiked ? "red" : "gray")};
  transition: color 0.3s ease;

  &:focus {
    outline: none;
  }
`;

export const GoButton = styled.button`
  width: 200%;
  height: 30%;
  background-color: #5060ff;
  border: none;
  border-radius: 30px;
  color: white;
  font-size: 20px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  text-align: center;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #4050d4;
  }

  &:focus {
    outline: none;
  }
`;

export const ColDiv = styled.div`
  display: flex;
  flex-direction: column;
`;
