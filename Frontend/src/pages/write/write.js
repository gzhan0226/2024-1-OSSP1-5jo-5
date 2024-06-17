import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './writeStyle';
import axios from 'axios';

const WriteBoard = () => {
  const navigate = useNavigate();
  const [boardType, setBoardType] = useState('free');
  const [title, setTitle] = useState('');
  const [apiName, setApiName] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async () => {
    const emptyFields = checkEmptyFields();
    if (emptyFields.length > 0) {
      alert(`비어 있는 공간이 있습니다: ${emptyFields.join(', ')}`);
    } else {
      try {
        await createPost();
        navigate('/board');
      } catch (error) {
        alert('게시글 작성 중 오류가 발생했습니다. 다시 시도해 주세요.');
      }
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
      user_id: 3, // Example user_id, replace with actual user id
      title,
      content,
    };

    if (type === 'question') {
      requestBody.api_id = 1; // Example api_id, replace with actual api id
    }

    const response = await axios.post(`/api/${type}`, requestBody);
    if (response.data.code === 201) {
      alert(response.data.message);
    } else {
      throw new Error(response.data.message);
    }
  };

  return (
    <S.AppContainer>
      <S.MainContentWrapper>
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
            <S.SubmitButton onClick={handleSubmit}>등록</S.SubmitButton>
          </S.Container>
        </S.MainContent>
      </S.MainContentWrapper>
    </S.AppContainer>
  );
};

export default WriteBoard;
