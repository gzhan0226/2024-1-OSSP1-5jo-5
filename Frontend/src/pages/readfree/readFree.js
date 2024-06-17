import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SearchBar from "../../component/common/SearchBar";
import * as S from './readFreeStyle';
import axios from 'axios';

const ReadFree = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [newCommentContent, setNewCommentContent] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [replyContent, setReplyContent] = useState({});
  const [editingReplyId, setEditingReplyId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 5;
  const userId = 'exampleUserId'; // 현재 사용자의 ID를 설정하세요

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/general?forum_id=1&general_id=${postId}`);
        if (response.data.code === 200) {
          setPost(response.data.result);
        } else {
          console.error('Error:', response.data.message);
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchPost();
  }, [postId]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/general/comment?forum_id=1&general_id=${postId}`);
        if (response.data.code === 200) {
          setComments(response.data.result);
        } else {
          console.error('Error:', response.data.message);
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchComments();
  }, [postId]);

  const handleEditPost = () => {
    navigate('/write', { state: { post, type: 'general' } });
  };

  const handleDeletePost = async () => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/general?forum_id=1&general_id=${postId}`);
      if (response.data.code === 200) {
        alert(response.data.message);
        navigate('/board');
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('게시글 삭제 중 오류가 발생했습니다.');
    }
  };

  if (!post) return <div>Loading...</div>;

  const toggleCommentBox = () => {
    setShowCommentBox(!showCommentBox);
    setEditingCommentId(null);
  };

  const handleNewCommentChange = (e) => {
    setNewCommentContent(e.target.value);
  };

  const handleNewCommentSubmit = async () => {
    if (newCommentContent.trim() === '') {
      alert('댓글을 입력하세요.');
      return;
    }

    // Implement comment submission logic here

    setNewCommentContent('');
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

  const handleReplySubmit = async (commentId) => {
    const content = replyContent[commentId]?.trim();
    if (!content) {
      alert('답글을 입력하세요.');
      return;
    }

    // Implement reply submission logic here

    setReplyContent({ ...replyContent, [commentId]: '' });
  };

  const handleCommentEdit = (commentId, content) => {
    setEditingCommentId(commentId);
    setNewCommentContent(content);
    setShowCommentBox(true);
  };

  const handleCommentUpdate = async () => {
    if (newCommentContent.trim() === '') {
      alert('댓글을 입력하세요.');
      return;
    }

    try {
      const response = await axios.put(`http://localhost:8080/api/general/comment?comment_id=${editingCommentId}`, {
        content: newCommentContent,
      });

      if (response.data.code === 200) {
        setComments(comments.map(comment =>
          comment.id === editingCommentId ? { ...comment, content: newCommentContent } : comment
        ));
        setEditingCommentId(null);
        setNewCommentContent('');
        setShowCommentBox(false);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Update error:', error);
      alert('댓글 수정 중 오류가 발생했습니다.');
    }
  };

  const handleCommentDelete = async (commentId) => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/general/comment?comment_id=${commentId}`);
      if (response.data.code === 200) {
        setComments(comments.filter(comment => comment.id !== commentId));
        alert(response.data.message);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('댓글 삭제 중 오류가 발생했습니다.');
    }
  };

  const currentComments = comments.slice(
    (currentPage - 1) * commentsPerPage,
    currentPage * commentsPerPage
  );

  const totalCommentPages = Math.ceil(comments.length / commentsPerPage);

  return (
    <S.AppContainer>
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
                <button onClick={handleEditPost}>수정</button>
                <button onClick={handleDeletePost}>삭제</button>
              </S.PostActions>
            )}
            <S.CommentsSection>
              <S.CommentsHeader>
                <h3>댓글</h3>
                <button onClick={toggleCommentBox}>댓글 쓰기</button>
              </S.CommentsHeader>
              {showCommentBox && (
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
                      <button onClick={handleCommentUpdate}>수정</button>
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
                            </S.ReplyBox>
                          ) : (
                            <>
                              <p>{reply.content}</p>
                              {userId === reply.authorId && (
                                <S.ReplyActions>
                                  <button>수정</button>
                                  <button>삭제</button>
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
