import React from "react";
import * as S from "./Style";
import SearchBar from "../../component/common/SearchBar";
import { FaUserCircle } from "react-icons/fa";
import ProfileBox from "./profileBox";

const MyPage = () => {
  return (
    <S.Container>
      <SearchBar />
      <ProfileBox></ProfileBox>
      {/* <LikeApi></LikeApi> */}
    </S.Container>
  );
};

export default MyPage;
