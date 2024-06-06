import React, { useState } from 'react';
import NavBar from '../../components/common/NavBar';
import SearchBar from '../../components/common/SearchBar';
import * as S from './readFreeStyle';

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
    <S.AppContainer>
      <NavBar />
      <S.MainContentWrapper>
        <SearchBar />
        <S.MainContent>
          <S.PostContainer>
            <S.PostTitleBox>
              <h2>{post.title}</h2>
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
            <S.CommentsSection>
              <S.CommentsHeader>
                <h3>댓글</h3>
                <button onClick={toggleCommentBox}>댓글 쓰기</button>
              </S.CommentsHeader>
              {showCommentBox && (
                <S.CommentBox>
                  <textarea placeholder="댓글을 입력하세요"></textarea>
                  <button>등록</button>
                </S.CommentBox>
              )}
              {comments.map((comment) => (
                <S.CommentItem key={comment.id}>
                  <S.CommentMeta>
                    <span>작성자: {comment.authorId}</span>
                    <span>작성일: {comment.date}</span>
                  </S.CommentMeta>
                  <p>{comment.content}</p>
                  {userId === comment.authorId && (
                    <S.CommentActions>
                      <button>수정</button>
                      <button>삭제</button>
                    </S.CommentActions>
                  )}
                </S.CommentItem>
              ))}
            </S.CommentsSection>
          </S.PostContainer>
        </S.MainContent>
      </S.MainContentWrapper>
    </S.AppContainer>
  );
}

export default PostView;
