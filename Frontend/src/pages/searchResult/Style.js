import styled from "styled-components";

export const DisplayRow = styled.div`
  display: flex;
  width: 82vw;
  display: 960px;
  background-color: rgb(245, 245, 251);
  padding-bottom: 150px;
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
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  padding-top: 3%;
  padding-bottom: 5%;
  min-height: 700px;
`;

export const CardGridItem = styled.div`
  display: flex;
  justify-content: center;
`;

export const DetailedViewContainer = styled.div`
  width: 100vw;
  background-color: white;
  display: flex;
  flex-direction: column;
  padding-top: 3%;
  padding-bottom: 5%;
  height: 88vh;
  padding-right: 2%;
  padding-left: 2%;
  max-height: 900px;
  hr {
    border: 0;
    height: 1px;
    background-color: #ebebeb; // 회색 선
    margin: 5px 0; // 위아래로 마진
  }
  position: sticky;
`;

export const Pavicon = styled.img`
  width: 100px;
  height: 100px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
`;

export const ApiName = styled.p`
  color: #5060ff;
  font-weight: 900;
  margin-left: auto;
  margin-right: auto;
  margin-top: 50px;
  font-size: 25px;
  line-height: 1.4;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  color: red;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  padding: 5px;
  outline: none;
  &:hover {
    opacity: 0.8;
  }
  margin-left: auto;
`;

// export const LinkButton = styled.div`
//   margin-left: auto;
//   margin-right: auto;
//   margin-top: auto;
//   width: 80%;
//   background-color: aqua;
//   height: 10%;
//   color: white;
// `;

export const LinkButton = styled.div`
  width: 80%;
  height: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  background-color: #8a94ff; // 버튼 배경색
  color: white; // 버튼 텍스트 색상
  border-radius: 35px; // 모서리 둥글게
  cursor: pointer; // 포인터 커서 표시
  font-size: 20px; // 폰트 크기
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  transition: background-color 0.3s ease; // 배경색 변화 애니메이션

  &:hover {
    background-color: #5060ff; // 호버 시 배경색 변경
  }
`;
export const SubTitle = styled.p`
  font-weight: 700;
  font-size: 20px;
  margin-bottom: 0;
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export const PaginationItem = styled.li`
  list-style-type: none;
  margin: 0 5px;

  .PageLink {
    display: block;
    padding: 8px 12px;
    text-decoration: none;
    color: #333;
    border: 1px solid #ddd;
    border-radius: 4px;
    transition: background-color 0.3s, color 0.3s;

    &:hover {
      background-color: #f5f5f5;
    }

    &.active {
      background-color: #007bff;
      color: #fff;
      border-color: #007bff;
    }
  }
`;
