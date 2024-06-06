import React from 'react';
import Banner from '../../component/main/Banner';
import CategoryIcons from '../../component/main/CategoryIcons';
import PostBoard from '../../component/main/PostBoard';
import Table from '../../component/main/Table';
import * as S from './Style'

const MainPage = () => {
  return (
    <S.MainWrapper>
      <CategoryIcons/>
      <S.BannerWrapper>
        <Banner/>
      </S.BannerWrapper>
      <S.TableWrapper>
        <Table/>
        <Table/>
      </S.TableWrapper>
      <S.PostBoardWrapper>
        <PostBoard/><PostBoard/>
      </S.PostBoardWrapper>
      
    </S.MainWrapper>
  );
};

export default MainPage;
