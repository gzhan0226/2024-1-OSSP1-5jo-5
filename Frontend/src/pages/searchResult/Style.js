import styled from "styled-components";

export const SearchResultPageContainer = styled.div`
  margin-left: 345px;
  justify-content: center;
  align-items: center;
  background-color: rgb(245, 245, 251);
  width: 77%;
  padding-top: 50px;
  padding-bottom: 80px;
`;

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 40px;
  column-gap: 40px;
  background-color: blue;
  width: 60%;
  margin-left: 15%;
`;

export const CardGridItem = styled.div`
  display: flex;
  justify-content: center;
`;
