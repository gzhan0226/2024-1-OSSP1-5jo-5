import React from "react";
import Banner from "../../component/main/Banner";
import CategoryIcons from "../../component/main/CategoryIcons";
import PostBoard from "../../component/main/PostBoard";
import Table from "../../component/main/Table";
import SearchBar from "../../component/common/SearchBar";
import * as S from "./Style";

const MainPage = () => {
  return (
    <S.MainWrapper>
      <SearchBar />
      <CategoryIcons />
      <S.BannerWrapper>
        <Banner />
      </S.BannerWrapper>
      <S.TableWrapper>
        <Table
          url="http://3.38.78.74:8080/api/list/top?type=likes"
          row="좋아요 수"
        />
        <Table
          url="http://localhost:8080/api/list/top?type=views"
          row="좋아요 수"
        />
      </S.TableWrapper>
      <S.TableWrapper2>
        <PostBoard />
        <PostBoard />
      </S.TableWrapper2>
    </S.MainWrapper>
  );
};

export default MainPage;
