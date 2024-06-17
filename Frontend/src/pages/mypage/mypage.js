import React from "react";
import * as S from "./Style";
import SearchBar from "../../component/common/SearchBar";
import { FaUserCircle } from "react-icons/fa";
const MyPage = () => {
  return (
    <S.Container>
      <SearchBar />
      <S.Profile>
        <S.Cdiv>
          <S.Rdiv>
            <FaUserCircle size={70} />
            <p>이름</p>
            <p>아이디</p>
            <S.Level></S.Level>
          </S.Rdiv>
          <S.Rdiv>
            <p>
              등록 API 수<br />8
            </p>
            <S.Hr />
            <p>
              질문수
              <br />8
            </p>
            <S.Hr />

            <p>
              답변수
              <br />8
            </p>
          </S.Rdiv>
        </S.Cdiv>
      </S.Profile>
    </S.Container>
  );
};

export default MyPage;
