import React, { useState } from 'react';
import NavBar from '../../components/common/NavBar';
import SearchBar from '../../components/common/SearchBar';
import * as S from './writeStyle';

const WriteBoard = () => {
  const [boardType, setBoardType] = useState('free');
  const [apiName, setApiName] = useState('');

  return (
    <S.AppContainer>
      <NavBar />
      <S.MainContentWrapper>
        <SearchBar />
        <S.MainContent>
          <S.Container>
            <S.TitleInput 
              type="text" 
              placeholder="제목" 
            />
            <S.BoardTypeButtons>
              <S.BoardTypeButton 
                active={boardType === 'free'} 
                onClick={() => setBoardType('free')}
              >
                자유게시판
              </S.BoardTypeButton>
              <S.BoardTypeButton 
                active={boardType === 'qna'} 
                onClick={() => setBoardType('qna')}
              >
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
            <S.ContentInput />
            <S.SubmitButton>등록</S.SubmitButton>
          </S.Container>
        </S.MainContent>
      </S.MainContentWrapper>
    </S.AppContainer>
  );
};

export default WriteBoard;
