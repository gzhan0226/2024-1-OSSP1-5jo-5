import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, Board, Header, BoardContainer } from "./Style";

const PostBoard2 = ({ url }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/forums/top?type=general")
      .then((response) => {
        setData(response.data.result);
        setLoading(false);
      })
      .catch((error) => {
        console.error("데이터를 가져오는 중 오류 발생:", error);
        setError("데이터를 불러오는 데 실패했습니다. 나중에 다시 시도해 주세요.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return (
      <div>
        <p>{error}</p>
      </div>
    );
  }

  const handleCardClick = (postId) => {
    navigate(`/readFree/${postId}`);
  };

  return (
    <BoardContainer>
      <Header>일반 게시판</Header>
      <Board>
        {data.length > 0 ? (
          data.map((item, index) => (
            <Card key={index} onClick={() => handleCardClick(item.id)}>
              {index + 1}. {item.title}
            </Card>
          ))
        ) : (
          <Card>데이터가 없습니다</Card>
        )}
      </Board>
    </BoardContainer>
  );
};

export default PostBoard2;
