import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as S from "./style";
import SearchBar from "../../component/common/SearchBar";

const ApiDetailPage = () => {
  const { id } = useParams(); // URL에 있는 api_id가 id임
  const [apiDetail, setApiDetail] = useState(null);
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  useEffect(() => {
    // API 호출을 통해 데이터를 불러옵니다.
    fetch(`http://localhost:8080/api/data?api_id=${id}`)
      .then((response) => response.json())
      .then((data) => {
        setApiDetail(data.data);
        console.log(data.data.name);
      })
      .catch((error) => {
        console.error("Error fetching API details: ", error);
        setApiDetail(null);
      });
  }, [id]);

  if (!apiDetail) {
    return <div>Loading...</div>;
  }

  const isExampleCodeProvided = apiDetail.example_code_provided === 1;
  const faviconSrc = apiDetail.favicon
    ? apiDetail.favicon
    : "/img/default_api.png";

  const handleGoButtonClick = () => {
    window.location.href = apiDetail.base_url;
  };

  return (
    <S.Container>
      <SearchBar />
      <S.AboutApi>
        <S.ColDiv>
          <S.Favicon src={faviconSrc} alt="API Favicon" />
          <p>API 등록자 : {apiDetail.user_id}</p>
          <p>
            #{apiDetail.pricepolicy} #{apiDetail.category}
          </p>
        </S.ColDiv>
        <S.ColDiv>
          <S.Example isProvided={isExampleCodeProvided}>
            {isExampleCodeProvided ? "예시코드 제공" : "예시코드 미제공"}
          </S.Example>
          <h1>{apiDetail.name}</h1>
          <p>{apiDetail.description}</p>
        </S.ColDiv>
        <S.ColDiv>
          <S.HeartButton onClick={toggleLike} isLiked={isLiked}>
            {isLiked ? "❤️" : "🤍"}
          </S.HeartButton>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-eye"
          >
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
          {apiDetail.view}Views
          <S.GoButton onClick={handleGoButtonClick}>URL 이동</S.GoButton>
        </S.ColDiv>
      </S.AboutApi>
    </S.Container>
  );
};

export default ApiDetailPage;
