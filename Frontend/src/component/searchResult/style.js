// CardStyles.js
import styled from "styled-components";

export const CardContainer = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  padding: 25px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: ${(props) => props.width || "100%"};
  background-color: white;
`;

export const CardIcon = styled.div`
  margin-bottom: 16px;

  img {
    width: 90px;
    height: 90px;
  }
`;

export const CardBookmark = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  cursor: pointer;
`;

export const CardViews = styled.div`
  display: flex;
  align-items: center;
  /* justify-content: center; */
  margin-bottom: 8px;

  svg {
    margin-right: 4px;
  }

  span {
    font-size: 0.875rem;
    color: #666;
  }
`;

export const CardTitle = styled.h3`
  font-size: 1.25rem;
  margin: 12px 0;
`;

export const CardDescription = styled.p`
  color: #666;
  font-size: 1rem;
  line-height: 1.5;
  margin-top: 0%;
`;
