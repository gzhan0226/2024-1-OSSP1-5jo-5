import styled from "styled-components";
import { FaSearch } from "react-icons/fa";

//여기서부터는 nav.js
export const NavBarContainer = styled.div`
  width: 16vw;
  max-height ;
  background-color: white;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  margin: 20px;
  margin-right: auto;
  margin-left: auto;
  margin-bottom: 18%;
`;

export const TitleDochi = styled.span`
  font-size: 35px;
  font-weight: 700;
  margin-left: 10px;
  color: #5060ff;
  white-space: nowrap;
`;

export const TitleApis = styled.span`
  font-size: 35px;
  font-weight: 800;
  margin-left: 8px;
`;

export const LogoIcon = styled.img`
  margin-left: 10px;
`;

export const MenuItem = styled.div`
  display: flex;
  align-items: center;
  color: #333;
  font-size: 20px;
  margin-bottom: 20%;
  cursor: pointer;
  margin-left: 20px;

  &:hover {
    color: #5060ff;
  }

  & > span {
    margin-left: 20px;
  }
`;
export const MenuItemContainer = styled.div`
  margin-bottom: 120%;
`;

export const MenuIcon = styled.div`
  font-size: 23px;
  color: #3b3b3b;
  position: relative;
  top: 3px;
`;

export const UserProfile = styled.div`
  display: flex;
  align-items: center;
  width: 85%;
  height: 5%;
  padding: 5%;
  border-radius: 60px 60px 60px 60px;
  border: 1px solid black;
`;

export const UserName = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-left: 20%;
  white-space: nowrap;
`;

export const UserStatus = styled.div`
  font-size: 14px;
  color: #666;
  margin-left: 20%;
  margin-top: 5%;
  white-space: nowrap;
`;

//여기서부터는 SearchBar.js
export const SearchBarContainer = styled.div`
  //width: 얘의 width는 searchbar.js에서 정의함
  height: 15vh;
  display: flex;
  justify-content: center;
  background-color: rgb(245, 245, 251);
  text-align: center;
  flex-grow: 1;
`;

export const Bar = styled.div`
  display: flex;
  align-items: center;
  border-radius: 50px;
  overflow: hidden;
  width: 100%;
  max-width: 800px;
  background-color: rgb(245, 245, 251);
  height: 40%;
  margin: auto;
`;

export const SearchInput = styled.input`
  flex: 1;
  padding: 10px 20px;
  font-size: 20px;
  color: gray;
  &:focus {
    outline: none;
  }
  height: 100%;
  border: none;
`;

export const SearchButton = styled.button`
  height: 100%;
  background-color: #5865f2;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
`;

export const Icon = styled(FaSearch)`
  color: white;
  font-size: 20px;
`;

export const FilterIconContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0 10px;
  cursor: pointer;
`;

export const FilterIcon = styled.div`
  width: 6px;
  height: 6px;
  background-color: #888;
  border-radius: 50%;
  margin: 2px 0;
`;
