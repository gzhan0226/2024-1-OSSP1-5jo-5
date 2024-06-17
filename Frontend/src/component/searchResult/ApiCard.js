// ApiCard.jsx
import React from "react";
import * as S from "./style";

const ApiCard = ({ icon, views, title, description, width }) => {
  return (
    <S.CardContainer width={width}>
      <S.CardIcon>
        <img src={icon} alt="Icon" />
      </S.CardIcon>
      {/* <S.CardBookmark>
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
          className="feather feather-bookmark"
        >
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
        </svg>
      </S.CardBookmark>*/}
      <S.CardViews>
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
      </S.CardViews>
      <span>{views} views</span>
      <S.CardTitle>{title}</S.CardTitle>
      <S.CardDescription>{description}</S.CardDescription>
    </S.CardContainer>
  );
};

export default ApiCard;
