import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import SearchBar from '../components/SearchBar';
import Footer from '../components/Footer';
import './readFreeBoardPage.css';

function PostView() {
  const post = {
    title: '예시 글 제목',
    authorId: 'author123',
    date: '2024-06-01',
    content: '이것은 예시 글의 내용입니다. 내용을 자세히 적어주세요.',
  };

  const userId = 'author123';
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comments, setComments] = useState([
    {
      id: 1,
      authorId: 'user456',
      date: '2024-06-02',
      content: '이것은 예시 댓글입니다. 댓글 내용을 자세히 적어주세요.',
    },
  ]);

  const toggleCommentBox = () => {
    setShowCommentBox(!showCommentBox);
  };

  return (
    <div className="app-container">
      <NavBar />
      <div className="main-content-wrapper">
        <SearchBar />
        <div className="main-content">
          <div className="post-container">
            <div className="post-title-box">
              <h2>{post.title}</h2>
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
            <div className="comments-section">
              <div className="comments-header">
                <h3>댓글</h3>
                <button onClick={toggleCommentBox}>댓글 쓰기</button>
              </div>
              {showCommentBox && (
                <div className="comment-box">
                  <textarea
                    placeholder="댓글을 입력하세요"
                  ></textarea>
                  <button>등록</button>
                </div>
              )}
              {comments.map((comment) => (
                <div key={comment.id} className="comment-item">
                  <div className="comment-meta">
                    <span>작성자: {comment.authorId}</span>
                    <span>작성일: {comment.date}</span>
                  </div>
                  <p>{comment.content}</p>
                  {userId === comment.authorId && (
                    <div className="comment-actions">
                      <button>수정</button>
                      <button>삭제</button>
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

export default PostView;
