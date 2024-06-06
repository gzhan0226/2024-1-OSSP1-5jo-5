import React from 'react';
import { FaHeartbeat, FaGamepad, FaMicroscope, FaGraduationCap, FaCar, FaChartLine, FaCloudSun, FaNewspaper, FaHome, FaShoppingCart, FaBasketballBall, FaHamburger, FaBolt, FaPaintBrush, FaTrash, FaMicrochip, FaInstagram, FaLaptopCode, FaEllipsisH,FaVideo } from 'react-icons/fa';
import { CategoryContainer, CategoryItem, IconLabel, IconBox } from './Style';

const categories = [
  { icon: <FaHeartbeat />, label: "건강" },
  { icon: <FaGamepad />, label: "게임" },
  { icon: <FaMicroscope />, label: "과학" },
  { icon: <FaGraduationCap />, label: "교육" },
  { icon: <FaCar />, label: "교통" },
  { icon: <FaChartLine />, label: "금융" },
  { icon: <FaCloudSun />, label: "날씨" },
  { icon: <FaNewspaper />, label: "뉴스" },
  { icon: <FaHome />, label: "부동산" },
  { icon: <FaVideo />, label: "영상&이미지" },
  { icon: <FaShoppingCart />, label: "쇼핑" },
  { icon: <FaBasketballBall />, label: "스포츠" },
  { icon: <FaHamburger />, label: "음식" },
  { icon: <FaBolt />, label: "에너지" },
  { icon: <FaPaintBrush />, label: "예술" },
  { icon: <FaTrash />, label: "청소" },
  { icon: <FaMicrochip />, label: "인공지능" },
  { icon: <FaInstagram />, label: "SNS" },
  { icon: <FaLaptopCode />, label: "IT" },
  { icon: <FaEllipsisH />, label: "더보기" },
];

const CategoryIcons = () => {
  return (
    <CategoryContainer>
      {categories.map((category, index) => (
        <CategoryItem key={index}>
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
