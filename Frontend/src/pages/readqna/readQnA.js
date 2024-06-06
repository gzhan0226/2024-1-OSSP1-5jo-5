import React, { useState } from 'react';
import NavBar from '../../components/common/NavBar';
import SearchBar from '../../components/common/SearchBar';
import * as S from './readQnAStyle';

function PostViewQnA() {
  const post = {
    title: '예시 질문 제목',
    apiName: '참조 API 이름',
    authorId: 'author123',
    date: '2024-06-01',
    content: '이것은 예시 질문의 내용입니다. 질문 내용을 자세히 적어주세요.',
  };

  const userId = 'author123';
  const [showAnswerBox, setShowAnswerBox] = useState(false);
  const [answers, setAnswers] = useState([
    {
      id: 1,
      authorId: 'user456',
      date: '2024-06-02',
      content: '이것은 예시 답변입니다. 답변 내용을 자세히 적어주세요.',
    },
  ]);

  const toggleAnswerBox = () => {
    setShowAnswerBox(!showAnswerBox);
  };

  return (
    <S.AppContainer>
      <NavBar />
      <S.MainContentWrapper>
        <SearchBar />
        <S.MainContent>
          <S.PostContainer>
            <S.PostTitleBox>
              <h2>{post.apiName} - {post.title}</h2>
            </S.PostTitleBox>
            <S.PostMetaBox>
              <S.PostMeta>
                <span>작성자: {post.authorId}</span>
                <span>작성일: {post.date}</span>
              </S.PostMeta>
            </S.PostMetaBox>
            <S.PostContentBox>
              <p>{post.content}</p>
            </S.PostContentBox>
            {userId === post.authorId && (
              <S.PostActions>
                <button>수정</button>
                <button>삭제</button>
              </S.PostActions>
            )}
            <S.AnswersSection>
              <S.AnswersHeader>
                <h3>답변</h3>
                <button onClick={toggleAnswerBox}>답변 쓰기</button>
              </S.AnswersHeader>
              {showAnswerBox && (
                <S.AnswerBox>
                  <textarea placeholder="답변을 입력하세요"></textarea>
                  <button>등록</button>
                </S.AnswerBox>
              )}
              {answers.map((answer) => (
                <S.AnswerItem key={answer.id}>
                  <S.AnswerMeta>
                    <span>작성자: {answer.authorId}</span>
                    <span>작성일: {answer.date}</span>
                  </S.AnswerMeta>
                  <p>{answer.content}</p>
                  {userId === post.authorId && (
                    <S.AnswerActions>
                      <button>재답변</button>
                      <button>채택</button>
                    </S.AnswerActions>
                  )}
                </S.AnswerItem>
              ))}
            </S.AnswersSection>
          </S.PostContainer>
        </S.MainContent>
      </S.MainContentWrapper>
    </S.AppContainer>
  );
}

export default PostViewQnA;
