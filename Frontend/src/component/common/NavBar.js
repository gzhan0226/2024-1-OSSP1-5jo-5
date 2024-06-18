import React, { useEffect, useState } from "react";
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
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Cookies:', Cookies.get());

    const user_id = Cookies.get('user_id');
    const user_name = Cookies.get('user_name');
    const user_email = Cookies.get('user_email');
    const levelpoint = Cookies.get('levelpoint');

    console.log('User Info from Cookies:', { user_id, user_name, user_email, levelpoint });

    if (user_id && user_name && user_email && levelpoint) {
      setUser({
        user_id,
        user_name,
        user_email,
        levelpoint,
      });
    } else {
      const fetchUserProfile = async () => {
        try {
          const response = await axios.get('http://localhost:8080/api/users');
          if (response.data.code === 200) {
            setUser(response.data.result);
            Cookies.set('user_id', response.data.result.user_id, { expires: 7 });
            Cookies.set('user_name', response.data.result.user_name, { expires: 7 });
            Cookies.set('user_email', response.data.result.user_email, { expires: 7 });
            Cookies.set('levelpoint', response.data.result.levelpoint, { expires: 7 });
            console.log('User Info from API:', response.data.result);
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      };

      fetchUserProfile();
    }
  }, []);

  useEffect(() => {
    console.log('User state:', user);
  }, [user]);

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
      <Logo onClick={homeClick}>
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
        {/* <MenuItem>
          <MenuIcon>
            <FaInfoCircle />
          </MenuIcon>
          <span>사이트 소개</span>
        </MenuItem> */}
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
