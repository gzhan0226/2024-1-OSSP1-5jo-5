import React from 'react';
import { NavBarContainer, MenuItem, MenuIcon, UserProfile, UserName, UserStatus, Logo, LogoText, LogoIcon } from './Style';
import { FaHome, FaSearch, FaQuestionCircle, FaInfoCircle, FaUserCircle } from 'react-icons/fa';

const NavBar = () => {
  return (
    <NavBarContainer>
      <Logo>
        <LogoText>도치 APIS</LogoText>
        <LogoIcon>🦔</LogoIcon>
      </Logo>
      <MenuItem>
        <MenuIcon><FaHome /></MenuIcon>
        <span>Home</span>
      </MenuItem>
      <MenuItem>
        <MenuIcon><FaSearch /></MenuIcon>
        <span>API 전체 조회</span>
      </MenuItem>
      <MenuItem>
        <MenuIcon><FaQuestionCircle /></MenuIcon>
        <span>Q&A</span>
      </MenuItem>
      <MenuItem>
        <MenuIcon><FaInfoCircle /></MenuIcon>
        <span>사이트 소개</span>
      </MenuItem>
      <UserProfile>
        <FaUserCircle size={40} />
        <div>
          <UserName>USER</UserName>
          <UserStatus>USER?!?!</UserStatus>
        </div>
      </UserProfile>
    </NavBarContainer>
  );
};

export default NavBar;
