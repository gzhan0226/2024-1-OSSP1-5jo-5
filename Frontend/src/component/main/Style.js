import styled from 'styled-components';

//여기는 Category Icons.js에 대한 

export const CategoryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 16px;
  padding: 30px 250px;
  justify-items: center;
  align-items: center;
`;

export const CategoryItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
`;

export const IconBox = styled.button`
  background-color: #ffffff;
  border-radius: 20px;
  border:none;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 70px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 12px;
  cursor:pointer;
  svg {
    color: #5865f2;
    font-size: 100px;
  }
`;

export const IconLabel = styled.span`
  font-size: 15px;
  color: black;
  text-align: center;
`;

//여기서부터는 Banner.jsx

export const BannerContainer = styled.div`
  border-radius: 16px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  padding: 60px 100px; 
  display: flex;
  justify-content: space-between; // 내부 요소들 사이의 간격을 균등하게 조정
  align-items: center;
  margin: 50px auto; 
  width: 60%; 
  height: 100px; 
  background: linear-gradient(to left, #3F6CDF, #7B87FF);
`;

export const BannerImage = styled.img`
  width: 150px; // 이미지 크기 조정
  height: auto; // 이미지 비율 유지
  margin-right: 20px; // 텍스트와의 간격
  margin: 0px auto; 
`;

export const BannerText = styled.div`
  flex: 1;
  color: white;
  display: flex;
  flex-direction:column;
  align-content:space-between;
  margin-left:100px; 
  line-height:150%
  h1 {
    font-size: 28px; // 제목 폰트 크기 조정
    margin-bottom: 15px; // 단락 간의 간격 조정
  }
  p {
    margin: 5px 0;
    font-size: 18px; // 텍스트 크기 조정
    svg {
      margin-right: 8px; // 아이콘과 텍스트 간의 간격 조정
    }
  }
`;

export const BannerButton = styled.button`
  background: #3F6CDF;
  color: white;
  border: none;
  padding: 15px 25px; // 버튼 패딩 조정
  border-radius: 50px;
  cursor: pointer;
  font-size: 18px; // 폰트 크기 조정
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #4752c4; // 호버 시 배경 색상 변경
  }
`;


//Board에 있는 것

export const BoardContainer=styled.div`
  display: flex;
  flex-direction: column;
  background-color: pink;
  width:46%;
`;

export const Board = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); // 2열
  grid-template-rows: repeat(5, 1fr); // 5행, 각 행의 높이가 같게 하고 싶다면 이렇게 설정
  gap: 20px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: white;
  width: 98%;
`;

export const Card = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border: 1px solid #5060FF; 
  border-radius: 8px;
`;

export const Header = styled.div`
  background-color: #97A8E7; // 제목 배경 색상
  color: white; // 텍스트 색상
  font-size: 20px; // 텍스트 크기
  text-align: center; // 텍스트 중앙 정렬
  padding: 15px; // 패딩
  border-radius: 8px 8px 0 0; // 상단 모서리 둥글게
  margin-bottom: -8px; // 카드와의 공간 제거
  z-index: 100;
  width: 100%;
`;

//Table에 있는 css

export const StyledTable = styled.table`
  width: 35%;
  border-collapse: collapse;
  background-color: #f3f4f6;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
  border:1px solid gray;
  font-size: 15px;
  white-space: nowrap;
`;

export const Th = styled.th`
  background-color: #5061ff;
  color: white;
  font-weight: bold;
  padding: 12px 15px;
`;

export const Td = styled.td`
  padding: 12px 15px;
  border-bottom: 1px solid #dddddd;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
`;

export const TdFavi = styled.img`
  padding: 12px 15px;
  text-align: center;
  width:40px;
  height:40px;
  border-radius:20px;
`;

export const Status = styled.span`
  background-color: ${props => {
    switch (props.status) {
      case 'SHIPPED':
        return '#34D399';
      case 'COMPLETE':
        return '#10B981';
      case 'PENDING':
        return '#F59E0B';
      case 'RETURN':
        return '#EF4444';
      default:
        return '#D1D5DB';
    }
  }};
  color: white;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 0.875em;
`;


