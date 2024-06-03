import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';

//여기서부터는 nav.js 
export const NavBarContainer = styled.div`
  width: 15%;
  height: 100vh;
  position: fixed;
  background-color: pink;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 40px;
`;

export const LogoText = styled.span`
  font-size: 24px;
  color: #3b49df;
  font-weight: bold;
  margin-right: 10px;
`;

export const LogoIcon = styled.span`
  font-size: 24px;
`;

export const MenuItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  color: #333;
  font-size: 18px;
  cursor: pointer;

  &:hover {
    color: #3b49df;
  }

  & > span {
    margin-left: 10px;
  }
`;

export const MenuIcon = styled.div`
  font-size: 20px;
`;

export const UserProfile = styled.div`
  margin-top: auto;
  display: flex;
  align-items: center;
`;

export const UserName = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

export const UserStatus = styled.div`
  font-size: 14px;
  color: #666;
`;


//여기서부터는 SearchBar.js
export const SearchBarContainer = styled.div`
  width:84vw;
  height:15vh;
  display:flex;
  justify-conten:center;
  background-color: rgb(245,245,251);
  margin: 0px 290px;
  text-align: center;
  display: fixed;
  overflow-x: hidden;
`
export const Bar = styled.div`
  display: flex;
  align-items: center;
  border-radius: 50px;
  overflow: hidden;
  width: 100%;
  max-width: 800px;
  background-color: rgb(245,245,251);
  height:40%;
  margin:auto;
`;

export const SearchInput = styled.input`
  flex: 1;
  padding: 10px 20px;
  font-size: 20px;
  color: gray;
  &:focus {
    outline: none;
  }
  height:100%;
  border: none;
`;

export const SearchButton = styled.button`
  height:100%;
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
