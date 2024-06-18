import React from "react";
import { Card, Board, Header, BoardContainer } from "./Style";

const PostBoard = () => {
 

  return (
    <BoardContainer>
      <Header>Q & A 게시판</Header>
      <Board>
        {Array.from({ length: 10 }).map((_, index) => (
          <Card key={index}>{index + 1}. API 이유가 왜 뜨는지 궁금해요</Card>
        ))}
      </Board>
    </BoardContainer>
  );
};

export default PostBoard;
