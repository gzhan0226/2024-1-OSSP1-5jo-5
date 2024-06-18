import React from "react";
import Banner from "../../component/main/Banner";
import CategoryIcons from "../../component/main/CategoryIcons";
import PostBoard from "../../component/main/PostBoard";
import Table from "../../component/main/Table";
import SearchBar from "../../component/common/SearchBar";
import * as S from "./style";
import PostBoard2 from "../../component/main/PostBoard2";

const MainPage = () => {
  return (
    <S.MainWrapper>
      <SearchBar />
      <CategoryIcons />
      <S.BannerWrapper>
        <Banner />
      </S.BannerWrapper>
      <S.PWrapper>
      <p>좋아요 수 많은 TOP API</p>
      <p>조회수 수 많은 TOP API</p>
      </S.PWrapper>
      <S.TableWrapper>
        
        <Table
          url="http://localhost:8080/api/list/top?type=likes"
          row="좋아요 수"
        />

        <Table
          url="http://localhost:8080/api/list/top?type=views"
          row="조회 수"
        />
      </S.TableWrapper>
      <S.TableWrapper2>
        <PostBoard />
        <PostBoard2 />
      </S.TableWrapper2>
    </S.MainWrapper>
  );
};

export default MainPage;
