import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import SearchBar from "../../component/common/SearchBar";
import * as S from './writeStyle';
import axios from 'axios';

const WriteBoard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isEditMode, setIsEditMode] = useState(false);
  const [postId, setPostId] = useState(null);
  const [boardType, setBoardType] = useState('free');
  const [title, setTitle] = useState('');
  const [apiName, setApiName] = useState('');
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const userId = Cookies.get('user_id');
    if (userId) {
      setUserId(userId);
    } else {
      alert('로그인이 필요합니다.');
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    if (location.state) {
      const { post, type } = location.state;
      setIsEditMode(true);
      setPostId(post.id);
      setBoardType(type === 'general' ? 'free' : 'qna');  
      setTitle(post.title);
      setContent(post.content);
      if (type === 'question') {
        setApiName(post.api_id);
      }
    }
  }, [location.state]);

  const handleSubmit = async () => {
    const emptyFields = checkEmptyFields();
    if (emptyFields.length > 0) {
      alert(`비어 있는 공간이 있습니다: ${emptyFields.join(', ')}`);
      return;
    }

    try {
      if (isEditMode) {
        await updatePost();
      } else {
        await createPost();
      }
      navigate('/board');
    } catch (error) {
      alert('게시글 작성 중 오류가 발생했습니다. 다시 시도해 주세요.');
      console.error('Submission error:', error.response ? error.response.data : error.message);
    }
  };

  const checkEmptyFields = () => {
    const emptyFields = [];
    if (title.trim() === '') emptyFields.push('제목');
    if (boardType === 'qna' && apiName.trim() === '') emptyFields.push('참고 API 이름');
    if (content.trim() === '') emptyFields.push('내용');
    return emptyFields;
  };

  const createPost = async () => {
    const type = boardType === 'free' ? 'general' : 'question';
    const requestBody = {
      user_id: userId,
      title,
      content,
    };

    if (type === 'question') {
      requestBody.api_id = apiName;
    }

    try {
      console.log('Creating post:', requestBody);
      const response = await axios.post(`http://localhost:8080/api/${type}`, requestBody, { withCredentials: true });
      console.log('Create response:', response.data);
      if (response.data.code === 201) {
        alert(response.data.message);
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error('Create post error:', error.response ? error.response.data : error.message);
      throw error;
    }
  };

  const updatePost = async () => {
    const type = boardType === 'free' ? 'general' : 'question';
    const requestBody = {
      title,
      content,
    };

    if (type === 'question') {
      requestBody.api_id = apiName;
    }

    try {
      console.log('Updating post:', requestBody);
      const response = await axios.put(`http://localhost:8080/api/${type}?forum_id=1&${type === 'general' ? 'general_id' : 'question_id'}=${postId}`, requestBody, { withCredentials: true });
      console.log('Update response:', response.data);
      if (response.data.code === 200) {
        alert(response.data.message);
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error('Update post error:', error.response ? error.response.data : error.message);
      throw error;
    }
  };

  return (
    <S.AppContainer>
      <S.MainContentWrapper>
        <SearchBar />
        <S.MainContent>
          <S.Container>
            <S.TitleInput type="text" placeholder="제목" value={title} onChange={(e) => setTitle(e.target.value)} />
            <S.BoardTypeButtons>
              <S.BoardTypeButton active={boardType === 'free'} onClick={() => setBoardType('free')}>
                자유게시판
              </S.BoardTypeButton>
              <S.BoardTypeButton active={boardType === 'qna'} onClick={() => setBoardType('qna')}>
                질문게시판
              </S.BoardTypeButton>
            </S.BoardTypeButtons>
            {boardType === 'qna' && (
              <S.ApiNameInput
                type="text"
                placeholder="참고 API 이름"
                value={apiName}
                onChange={(e) => setApiName(e.target.value)}
              />
            )}
            <S.ContentInput placeholder="내용을 입력하세요" value={content} onChange={(e) => setContent(e.target.value)} />
            <S.SubmitButton onClick={handleSubmit}>{isEditMode ? '수정' : '등록'}</S.SubmitButton>
          </S.Container>
        </S.MainContent>
      </S.MainContentWrapper>
    </S.AppContainer>
  );
};

export default WriteBoard;
