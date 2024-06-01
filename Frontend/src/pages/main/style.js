import styled from 'styled-components';

//여기는 Category Icons.js에 대한 

export const CategoryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 16px;
  padding: 150px;
  justify-items: center;
  align-items: center;
`;

export const CategoryItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const IconBox = styled.div`
  background-color: #ffffff;
  border-radius: 20px;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 8px;

  svg {
    color: #5865f2;
    font-size: 32px;
  }
`;

export const IconLabel = styled.span`
  font-size: 14px;
  color: #5865f2;
  text-align: center;
`;

//여기서부터는 Banner.jsx

export const BannerContainer = styled.div`
  background-color: #eef1ff;
  border-radius: 16px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
`;

export const BannerContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 800px;
`;

export const BannerImage = styled.img`
  width: 80px;
  height: 80px;
  margin-right: 20px;
`;

export const BannerText = styled.div`
  flex: 1;
  color: #5865f2;
  h1 {
    font-size: 24px;
    margin: 0 0 10px;
  }
  p {
    margin: 5px 0;
    display: flex;
    align-items: center;
    font-size: 16px;
    svg {
      margin-right: 5px;
    }
  }
`;

export const BannerButton = styled.button`
  background-color: #5865f2;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 50px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #4752c4;
  }
`;

//Board에 있는 것
export const Board = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); // 2열
  grid-template-rows: repeat(5, 1fr); // 5행, 각 행의 높이가 같게 하고 싶다면 이렇게 설정
  gap: 20px;
  padding: 20px;
  background-color: #f3f4f6;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: white;
  
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
`;

//Table에 있는 css

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #f3f4f6;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
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