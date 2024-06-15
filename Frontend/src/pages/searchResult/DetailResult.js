import React from "react";
import * as S from "./Style";

const DetailedView = ({ api, onClose }) => {
  if (!api) return null;

  return (
    <S.DetailedViewContainer>
      <img src={api.icon} alt={api.title} />
      <h1>{api.title}</h1>
      <p>{api.description}</p>
      <button onClick={onClose}>x</button>
    </S.DetailedViewContainer>
  );
};

export default DetailedView;
