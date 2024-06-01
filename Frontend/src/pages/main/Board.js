import React from 'react';
import { Card, Board,Header } from './style';
  
const PostBoard = () => {  
    return (
        <>
          <Header>Q & A 게시판</Header>
          <Board>
            {Array.from({ length: 10 }).map((_, index) => (
              <Card key={index}>
                {index + 1}. API 이유가 왜 뜨는지 궁금해요
              </Card>
            ))}
          </Board>
        </>
      );
    };

  export default PostBoard;