import React, { useState } from 'react';
import NavBar from '../../components/common/NavBar';
import SearchBar from '../../components/common/SearchBar';
import * as S from './boardStyle';

function BulletinBoard() {
  const [activeTab, setActiveTab] = useState('freeBoard');
  const posts = [
    { title: 'Title 1', content: 'Content 1', date: '2023-06-01', views: 10, comments: 2, api: 'Twitter API' },
  ];

  const renderPost = (post) => (
    <S.PostItem key={post.title}>
      <div>
        {activeTab === 'questionBoard' && <h4>{post.api}</h4>}
        <h4>{post.title}</h4>
        <p>{post.content}</p>
      </div>
      <S.PostDetails>
        <p>{post.date}</p>
        <p>Views: {post.views}</p>
        <p>Comments: {post.comments}</p>
      </S.PostDetails>
    </S.PostItem>
  );

  return (
    <S.AppContainer>
      <NavBar />
      <S.MainContentWrapper>
        <SearchBar />
        <S.MainContent>
          <S.Tabs>
            <div>
              <S.TabButton 
                active={activeTab === 'freeBoard'}
                onClick={() => setActiveTab('freeBoard')}
              >
                자유게시판
              </S.TabButton>
              <S.TabButton 
                active={activeTab === 'questionBoard'}
                onClick={() => setActiveTab('questionBoard')}
              >
                질문게시판
              </S.TabButton>
            </div>
            <S.WriteButton>글쓰기</S.WriteButton>
          </S.Tabs>
          <S.PostsList>
            {posts.map(renderPost)}
          </S.PostsList>
          <S.Pagination>
            <S.PaginationButton active>1</S.PaginationButton>
            <S.PaginationButton>2</S.PaginationButton>
            <S.PaginationButton>3</S.PaginationButton>
            <S.PaginationButton>4</S.PaginationButton>
            <S.PaginationButton>5</S.PaginationButton>
          </S.Pagination>
        </S.MainContent>
      </S.MainContentWrapper>
    </S.AppContainer>
  );
}

export default BulletinBoard;
