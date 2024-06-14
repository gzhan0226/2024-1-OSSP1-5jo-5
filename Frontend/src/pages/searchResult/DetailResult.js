import React from "react";
import styled from "styled-components";

const DetailedViewContainer = styled.div`
  /* Add your styles here */
`;

const DetailedView = ({ api, onClose }) => {
  if (!api) return null;

  return (
    <DetailedViewContainer>
      <img src={api.icon} alt={api.title} />
      <h1>{api.title}</h1>
      <p>{api.description}</p>
      <button onClick={onClose}>Close</button>
    </DetailedViewContainer>
  );
};

export default DetailedView;
