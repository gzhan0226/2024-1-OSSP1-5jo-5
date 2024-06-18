import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import SearchBar from "../../component/common/SearchBar";
import * as S from './boardStyle';
import axios from 'axios';

const Board = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('freeBoard');
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const userId = Cookies.get('user_id');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    if (tab) {
      setActiveTab(tab);
    }
  }, [location]);

  useEffect(() => {
    const fetchPosts = async () => {
      const type = activeTab === 'freeBoard' ? 'general' : 'question';
      const api_id = null;

      let url = `http://localhost:8080/api/forums?type=${type}&page=${currentPage}`;
      if (type === 'question' && api_id) url += `&api_id=${api_id}`;

      try {
        const response = await axios.get(url);
        if (response.data.code === 200) {
          setPosts(response.data.result);
          setTotalPages(response.data.totalPages);
        } else {
          console.error('Error:', response.data.message);
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchPosts();
  }, [activeTab, currentPage]);

  const truncateContent = (content, maxLength) => {
    if (content.length > maxLength) {
      return content.substring(0, maxLength) + '...';
    }
    return content;
  };

  const renderPost = (post, index) => (
    <S.PostItem key={`${post.title}-${index}`} onClick={() => handlePostClick(post)}>
      <div>
        {activeTab === 'questionBoard' && <S.ApiName>{post.api_id}</S.ApiName>}
        <h4>{post.title}</h4>
        <p>{truncateContent(post.content, 15)}</p>
        <S.Username>{post.user_id}</S.Username>
      </div>
      <S.PostDetails>
        <p>{new Date(post.creation_date).toLocaleDateString()}</p>
        <p>Views: {post.view}</p>
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

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  return (
    <S.AppContainer>
      <S.MainContentWrapper>
        <SearchBar />
        <S.MainContent>
          <S.Tabs>
            <div>
              <S.TabButton active={activeTab === 'freeBoard'} onClick={() => handleTabChange('freeBoard')}>
                자유게시판
              </S.TabButton>
              <S.TabButton active={activeTab === 'questionBoard'} onClick={() => handleTabChange('questionBoard')}>
                질문게시판
              </S.TabButton>
            </div>
            <S.WriteButton onClick={handleWriteClick}>글쓰기</S.WriteButton>
          </S.Tabs>
          <S.PostsList>{posts.map((post, index) => renderPost(post, index))}</S.PostsList>
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
