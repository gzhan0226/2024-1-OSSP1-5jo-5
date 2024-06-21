import React, { useEffect, useState, useContext } from "react"; // Import useContext
import axios from "axios";
import Cookies from "js-cookie";
import {
  NavBarContainer,
  MenuItem,
  MenuIcon,
  UserProfile,
  UserName,
  UserStatus,
  Logo,
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
import { UserContext } from '../../component/user/UserContext'; // Import UserContext

const NavBar = () => {
  const { user } = useContext(UserContext); // Use useContext to access user
  const navigate = useNavigate();

  const homeClick = () => {
    navigate("/");
  };

  const resultClick = () => {
    navigate("/allresult");
  };

  const qnaClick = () => {
    navigate("/board");
  };

  const myClick = () => {
    if (user) {
      navigate("/mypage");
    } else {
      alert("로그인이 필요합니다.");
      navigate("/login");
    }
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
        <MenuItem onClick={qnaClick} style={{ cursor: "pointer" }}>
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
        {user ? (
          <div onClick={myClick} style={{ cursor: "pointer" }}>
            <UserName>{user.user_name}</UserName>
            <UserStatus>{user.levelpoint}</UserStatus>
          </div>
        ) : (
          <div onClick={() => navigate("/login")} style={{ cursor: "pointer" }}>
            <UserName>로그인해주세요</UserName>
          </div>
        )}
      </UserProfile>
    </NavBarContainer>
  );
};

export default NavBar;
