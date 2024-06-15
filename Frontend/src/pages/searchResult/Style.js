import styled from "styled-components";

export const DisplayRow = styled.div`
  display: flex;
  width: 81vw;
  background-color: rgb(245, 245, 251);
`;

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  row-gap: 40px;
  column-gap: 40px;
  background-color: rgb(245, 245, 251);
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  padding-top: 3%;
  padding-bottom: 5%;
`;

export const CardGridItem = styled.div`
  display: flex;
  justify-content: center;
`;

export const DetailedViewContainer = styled.div`
  width: 21vw;
  background-color: yellow;
  display: flex;
  flex-direction: column;
  padding-top: 5%;
  padding-right: 2%;
  padding-left: 2%;
  max-height: 100vh;
  max-width: 21vw;
  position: sticky;
`;
