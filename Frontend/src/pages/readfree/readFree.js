import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import * as S from './readFreeStyle';

const ReadFree = () => {
  const { postId } = useParams();
  const post = {
    id: postId,
    title: '주말에 뭐하시나요?',
    authorId: 'author123',
    date: '2024-06-01',
    content: '주말에 어떤 활동을 하시나요? 추천할 만한 취미나 이벤트가 있으면 알려주세요!',
  };

  const userId = 'author123';
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [newCommentContent, setNewCommentContent] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 5;

  const [comments, setComments] = useState([
    {
      id: 1,
      authorId: 'user456',
      date: '2024-06-02',
      content: '저는 등산을 자주 가요. 요즘 날씨도 좋아서 추천드립니다!',
      showReplyBox: false,
      replies: [],
    },
    {
      id: 2,
      authorId: 'author123',
      date: '2024-06-03',
      content: '저는 주말마다 새로운 카페를 찾아다니는 게 취미에요. 최근에 발견한 좋은 카페를 공유할게요.',
      showReplyBox: false,
      replies: [],
    },
  ].sort((a, b) => new Date(b.date) - new Date(a.date)));

  const [replyContent, setReplyContent] = useState({});
  const [editingReplyId, setEditingReplyId] = useState(null);
  const [originalReplyContent, setOriginalReplyContent] = useState({});

  const toggleCommentBox = () => {
    setShowCommentBox(!showCommentBox);
    setEditingCommentId(null);
    setNewCommentContent('');
  };

  const handleNewCommentChange = (e) => {
    setNewCommentContent(e.target.value);
  };

  const handleNewCommentSubmit = () => {
    if (newCommentContent.trim() === '') {
      alert('댓글을 입력하세요.');
      return;
    }
    if (editingCommentId) {
      setComments(comments.map(comment =>
        comment.id === editingCommentId
          ? { ...comment, content: newCommentContent }
          : comment
      ));
      setEditingCommentId(null);
    } else {
      const newComment = {
        id: Date.now(),
        authorId: userId,
        date: new Date().toISOString().split('T')[0],
        content: newCommentContent,
        showReplyBox: false,
        replies: [],
      };
      setComments([newComment, ...comments]);
    }
    setNewCommentContent('');
    setShowCommentBox(false);
  };

  const handleEditPost = () => {
    alert('기능 구현 예정: 글 수정');
  };

  const handleDeletePost = () => {
    alert('기능 구현 예정: 글 삭제');
  };

  const handleCommentDelete = (commentId) => {
    setComments(comments.filter(comment => comment.id !== commentId));
  };

  const handleCommentEdit = (commentId, content) => {
    setEditingCommentId(commentId);
    setNewCommentContent(content);
    setShowCommentBox(false);
  };

  const toggleReplyBox = (commentId) => {
    setComments(comments.map(comment =>
      comment.id === commentId
        ? { ...comment, showReplyBox: !comment.showReplyBox }
        : comment
    ));
  };

  const handleReplyChange = (commentId, content) => {
    setReplyContent({ ...replyContent, [commentId]: content });
  };

  const handleReplySubmit = (commentId) => {
    const content = replyContent[commentId]?.trim();
    if (!content) {
      alert('답글을 입력하세요.');
      return;
    }
    if (editingReplyId) {
      setComments(comments.map(comment =>
        comment.id === commentId
          ? {
            ...comment,
            replies: comment.replies.map(reply =>
              reply.id === editingReplyId
                ? { ...reply, content: content }
                : reply
            )
          }
          : comment
      ));
      setEditingReplyId(null);
    } else {
      setComments(comments.map(comment =>
        comment.id === commentId
          ? {
            ...comment,
            replies: [{ id: Date.now(), authorId: userId, content: content, date: new Date().toISOString().split('T')[0] }, ...comment.replies],
            showReplyBox: false,
          }
          : comment
      ));
    }
    setReplyContent({ ...replyContent, [commentId]: '' });
  };

  const handleReplyDelete = (commentId, replyId) => {
    setComments(comments.map(comment =>
      comment.id === commentId
        ? {
          ...comment,
          replies: comment.replies.filter(reply => reply.id !== replyId),
        }
        : comment
    ));
  };

  const handleReplyEdit = (commentId, reply) => {
    setEditingReplyId(reply.id);
    setReplyContent({ ...replyContent, [commentId]: reply.content });
    setOriginalReplyContent({ ...originalReplyContent, [reply.id]: reply.content });
  };

  const handleCancelReplyEdit = (commentId, replyId) => {
    setEditingReplyId(null);
    setReplyContent({ ...replyContent, [commentId]: '' });
  };

  // Pagination logic for comments
  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);
  const totalCommentPages = Math.ceil(comments.length / commentsPerPage);

  return (
    <S.AppContainer>
      <S.MainContentWrapper>
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
                <button onClick={handleEditPost}>수정</button>
                <button onClick={handleDeletePost}>삭제</button>
              </S.PostActions>
            )}
            <S.CommentsSection>
              <S.CommentsHeader>
                <h3>댓글</h3>
                <button onClick={toggleCommentBox}>댓글 쓰기</button>
              </S.CommentsHeader>
              {showCommentBox && !editingCommentId && (
                <S.CommentBox>
                  <textarea
                    placeholder="댓글을 입력하세요"
                    value={newCommentContent}
                    onChange={handleNewCommentChange}
                  />
                  <button onClick={handleNewCommentSubmit}>{editingCommentId ? '수정' : '등록'}</button>
                </S.CommentBox>
              )}
              {currentComments.map((comment) => (
                <S.CommentItem key={comment.id} isAuthor={comment.authorId === post.authorId}>
                  <S.CommentMeta isAuthor={comment.authorId === post.authorId}>
                    <span>작성자: {comment.authorId}</span>
                    <span>작성일: {comment.date}</span>
                  </S.CommentMeta>
                  {editingCommentId === comment.id ? (
                    <S.CommentBox>
                      <textarea
                        value={newCommentContent}
                        onChange={handleNewCommentChange}
                      />
                      <button onClick={handleNewCommentSubmit}>수정</button>
                    </S.CommentBox>
                  ) : (
                    <>
                      <p>{comment.content}</p>
                      {userId === comment.authorId && (
                        <S.CommentActions>
                          <button onClick={() => handleCommentEdit(comment.id, comment.content)}>수정</button>
                          <button onClick={() => handleCommentDelete(comment.id)}>삭제</button>
                        </S.CommentActions>
                      )}
                      <S.CommentActions>
                        <button onClick={() => toggleReplyBox(comment.id)}>답글</button>
                      </S.CommentActions>
                      {comment.showReplyBox && editingReplyId === null && (
                        <S.ReplyBox>
                          <textarea
                            value={replyContent[comment.id] || ''}
                            onChange={(e) => handleReplyChange(comment.id, e.target.value)}
                            placeholder="답글을 입력하세요"
                          />
                          <button onClick={() => handleReplySubmit(comment.id)}>등록</button>
                        </S.ReplyBox>
                      )}
                      {comment.replies && comment.replies.map((reply) => (
                        <S.ReplyItem key={reply.id}>
                          <S.ReplyMeta>
                            <span>작성자: {reply.authorId}</span>
                            <span>작성일: {reply.date}</span>
                          </S.ReplyMeta>
                          {editingReplyId === reply.id ? (
                            <S.ReplyBox>
                              <textarea
                                value={replyContent[comment.id] || ''}
                                onChange={(e) => handleReplyChange(comment.id, e.target.value)}
                              />
                              <button onClick={() => handleReplySubmit(comment.id)}>수정</button>
                              <button onClick={() => handleCancelReplyEdit(comment.id, reply.id)}>취소</button>
                            </S.ReplyBox>
                          ) : (
                            <>
                              <p>{reply.content}</p>
                              {userId === reply.authorId && (
                                <S.ReplyActions>
                                  <button onClick={() => handleReplyEdit(comment.id, reply)}>수정</button>
                                  <button onClick={() => handleReplyDelete(comment.id, reply.id)}>삭제</button>
                                </S.ReplyActions>
                              )}
                            </>
                          )}
                        </S.ReplyItem>
                      ))}
                    </>
                  )}
                </S.CommentItem>
              ))}
              <S.Pagination>
                {Array.from({ length: totalCommentPages }, (_, i) => (
                  <S.PaginationButton 
                    key={i + 1} 
                    active={currentPage === i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </S.PaginationButton>
                ))}
              </S.Pagination>
            </S.CommentsSection>
          </S.PostContainer>
        </S.MainContent>
      </S.MainContentWrapper>
    </S.AppContainer>
  );
};

export default ReadFree;
