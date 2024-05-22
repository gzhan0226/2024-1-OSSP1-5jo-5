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
