import React from "react";
import {
  NavBarContainer,
  MenuItem,
  MenuIcon,
  UserProfile,
  UserName,
  UserStatus,
  Logo,
  LogoText,
  LogoIcon,
  TitleDochi,
  TitleApis,
  MenuItemContainer,
} from "./Style";
import {
  FaHome,
  FaSearch,
  FaQuestionCircle,
  FaInfoCircle,
  FaUserCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  const homeClick = () => {
    navigate("/");
  };

  const resultClick = () => {
    navigate("/allresult");
  };

  const myClick = () => {
    navigate("/mypage");
  };

  return (
    <NavBarContainer>
      <Logo>
        <TitleDochi>도치</TitleDochi>
        <TitleApis>APIS</TitleApis>
        <LogoIcon src="/img/dochi.png" alt="Dochi" />
      </Logo>
      <MenuItemContainer>
        <MenuItem onClick={homeClick} style={{ cursor: "pointer" }}>
          <MenuIcon>
            <FaHome />
          </MenuIcon>
          <span>Home</span>
        </MenuItem>
        <MenuItem onClick={resultClick} style={{ cursor: "pointer" }}>
          <MenuIcon>
            <FaSearch />
          </MenuIcon>
          <span>API 전체 조회</span>
        </MenuItem>
        <MenuItem>
          <MenuIcon>
            <FaQuestionCircle />
          </MenuIcon>
          <span>Q&A</span>
        </MenuItem>
        <MenuItem>
          <MenuIcon>
            <FaInfoCircle />
          </MenuIcon>
          <span>사이트 소개</span>
        </MenuItem>
      </MenuItemContainer>
      <UserProfile>
        <FaUserCircle size={40} />
        <div onClick={myClick} style={{ cursor: "pointer" }}>
          <UserName>유저이름</UserName>
          <UserStatus>브론즈</UserStatus>
        </div>
      </UserProfile>
    </NavBarContainer>
  );
};

export default NavBar;
