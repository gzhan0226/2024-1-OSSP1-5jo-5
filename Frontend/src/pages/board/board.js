import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import * as S from './boardStyle';

const Board = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('freeBoard');
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const postsPerPage = 5;

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    if (tab) {
      setActiveTab(tab);
    }
  }, [location]);

  const freeBoardPosts = [/* ... */];
  const questionBoardPosts = [/* ... */];

  useEffect(() => {
    const newPosts = activeTab === 'freeBoard' ? freeBoardPosts : questionBoardPosts;
    setPosts(newPosts);
    setCurrentPage(1);
  }, [activeTab]);

  const truncateContent = (content, maxLength) => {
    if (content.length > maxLength) {
      return content.substring(0, maxLength) + '...';
    }
    return content;
  };

  const renderPost = (post, index) => (
    <S.PostItem key={`${post.title}-${index}`} onClick={() => handlePostClick(post)}>
      <div>
        {activeTab === 'questionBoard' && <S.ApiName>{post.api}</S.ApiName>}
        <h4>{post.title}</h4>
        <p>{truncateContent(post.content, 15)}</p>
        <S.Username>{post.username}</S.Username>
      </div>
      <S.PostDetails>
        <p>{post.date}</p>
        <p>Views: {post.views}</p>
        <p>Comments: {post.comments}</p>
      </S.PostDetails>
    </S.PostItem>
  );

  const handlePostClick = (post) => {
    const path = activeTab === 'freeBoard' ? `/readFree/${post.id}` : `/readQnA/${post.id}`;
    navigate(path);
  };

  const handleWriteClick = () => {
    navigate('/write');
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  return (
    <S.AppContainer>
      <S.MainContentWrapper>
        <S.MainContent>
          <S.Tabs>
            <div>
              <S.TabButton active={activeTab === 'freeBoard'} onClick={() => setActiveTab('freeBoard')}>
                자유게시판
              </S.TabButton>
              <S.TabButton active={activeTab === 'questionBoard'} onClick={() => setActiveTab('questionBoard')}>
                질문게시판
              </S.TabButton>
            </div>
            <S.WriteButton onClick={handleWriteClick}>글쓰기</S.WriteButton>
          </S.Tabs>
          <S.PostsList>{currentPosts.map((post, index) => renderPost(post, index))}</S.PostsList>
          <S.Pagination>
            {Array.from({ length: totalPages }, (_, i) => (
              <S.PaginationButton key={i + 1} active={currentPage === i + 1} onClick={() => setCurrentPage(i + 1)}>
                {i + 1}
              </S.PaginationButton>
            ))}
          </S.Pagination>
        </S.MainContent>
      </S.MainContentWrapper>
    </S.AppContainer>
  );
};

export default Board;
