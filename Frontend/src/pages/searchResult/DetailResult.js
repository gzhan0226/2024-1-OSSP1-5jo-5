import React from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./Style";

const DetailedView = ({ api, onClose }) => {
  const navigate = useNavigate();

  if (!api) return null;

  const handleDetailsClick = () => {
    navigate(`/api-details/${api.api_id}`);
  };

  return (
    <>
      <S.DetailedViewContainer>
        <S.CloseButton onClick={onClose}>X</S.CloseButton>
        <S.Pavicon
          src={api.favicon || "/img/default_api.png"}
          alt={api.title}
        />
        <S.ApiName>{api.name}</S.ApiName>
        <hr />
        <S.SubTitle>API의 가격정책</S.SubTitle>
        <p>{api.pricepolicy}</p>
        <hr />
        <S.SubTitle>About the API</S.SubTitle>
        <p style={{ lineHeight: "1.5" }}>{api.description}</p>
        <S.LinkButton onClick={handleDetailsClick}>자세히 보기</S.LinkButton>
      </S.DetailedViewContainer>
    </>
  );
};

export default DetailedView;
