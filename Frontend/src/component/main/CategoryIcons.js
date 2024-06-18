import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeartbeat, FaGamepad, FaMicroscope, FaGraduationCap, FaCar, FaChartLine, FaCloudSun, FaNewspaper, FaHome, FaShoppingCart, FaBasketballBall, FaHamburger, FaBolt, FaPaintBrush, FaPlane, FaMicrochip, FaInstagram, FaLaptopCode, FaEllipsisH, FaVideo } from 'react-icons/fa';
import { CategoryContainer, CategoryItem, IconLabel, IconBox } from './Style';
import axios from 'axios';

const categories = [
  { icon: <FaHeartbeat />, label: "건강", id: 1 },
  { icon: <FaGamepad />, label: "게임", id: 2 },
  { icon: <FaMicroscope />, label: "과학", id: 3 },
  { icon: <FaGraduationCap />, label: "교육", id: 4 },
  { icon: <FaCar />, label: "교통", id: 5 },
  { icon: <FaChartLine />, label: "금융", id: 6 },
  { icon: <FaCloudSun />, label: "날씨", id: 7 },
  { icon: <FaNewspaper />, label: "뉴스", id: 8 },
  { icon: <FaHome />, label: "부동산", id: 9 },
  { icon: <FaVideo />, label: "영상&이미지", id: 10 },
  { icon: <FaShoppingCart />, label: "쇼핑", id: 11 },
  { icon: <FaBasketballBall />, label: "스포츠", id: 12 },
  { icon: <FaHamburger />, label: "음식", id: 13 },
  { icon: <FaBolt />, label: "에너지", id: 14 },
  { icon: <FaPaintBrush />, label: "예술", id: 15 },
  { icon: <FaPlane />, label: "여행", id: 16 },
  { icon: <FaMicrochip />, label: "인공지능", id: 17 },
  { icon: <FaInstagram />, label: "SNS", id: 18 },
  { icon: <FaLaptopCode />, label: "IT", id: 19 },
  { icon: <FaEllipsisH />, label: "더보기", id: 20 },
];

const CategoryIcons = () => {
  const navigate = useNavigate();

  const handleCategoryClick = async (id, label) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/list?categoryId=${id}`);
      const data = response.data;
      const result = data.result; // JSON 응답에서 result 배열 추출
      const totalPages = data.totalPages; // JSON 응답에서 totalPages 값 추출
      navigate('/category-result', { state: { result, totalPages, resultMessage: `${label} 카테고리의 검색 결과입니다.` } });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <CategoryContainer>
      {categories.map((category) => (
        <CategoryItem key={category.id} onClick={() => handleCategoryClick(category.id, category.label)}>
          <IconBox>
            {category.icon}
          </IconBox>
          <IconLabel>{category.label}</IconLabel>
        </CategoryItem>
      ))}
    </CategoryContainer>
  );
};

export default CategoryIcons;
