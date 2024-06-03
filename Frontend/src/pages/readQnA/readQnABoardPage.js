import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import SearchBar from '../components/SearchBar';
import Footer from '../components/Footer';
import './readQnABoardPage.css';

function PostViewQnA() {
  const post = {
    title: '예시 질문 제목',
    apiName: '참조 API 이름',
    authorId: 'author123',
    date: '2024-06-01',
    content: '이것은 예시 질문의 내용입니다. 질문 내용을 자세히 적어주세요.',
  };

  const userId = 'author123'; // 예시로 현재 사용자 ID를 작성자 ID로 설정합니다.
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
    <div className="app-container">
      <NavBar />
      <div className="main-content-wrapper">
        <SearchBar />
        <div className="main-content">
          <div className="post-container">
            <div className="post-title-box">
              <h2>{post.apiName} - {post.title}</h2>
            </div>
            <div className="post-meta-box">
              <div className="post-meta">
                <span>작성자: {post.authorId}</span>
                <span>작성일: {post.date}</span>
              </div>
            </div>
            <div className="post-content-box">
              <p>{post.content}</p>
            </div>
            {userId === post.authorId && (
              <div className="post-actions">
                <button>수정</button>
                <button>삭제</button>
              </div>
            )}
            <div className="answers-section">
              <div className="answers-header">
                <h3>답변</h3>
                <button onClick={toggleAnswerBox}>답변 쓰기</button>
              </div>
              {showAnswerBox && (
                <div className="answer-box">
                  <textarea
                    placeholder="답변을 입력하세요"
                  ></textarea>
                  <button>등록</button>
                </div>
              )}
              {answers.map((answer) => (
                <div key={answer.id} className="answer-item">
                  <div className="answer-meta">
                    <span>작성자: {answer.authorId}</span>
                    <span>작성일: {answer.date}</span>
                  </div>
                  <p>{answer.content}</p>
                  {userId === post.authorId && (
                    <div className="answer-actions">
                      <button>재답변</button>
                      <button>채택</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostViewQnA;
