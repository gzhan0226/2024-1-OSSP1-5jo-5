import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
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
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 5;
  const userId = Cookies.get('user_id');
  const Admin_account = Cookies.get('Admin_account');

  useEffect(() => {
    if (!userId) {
      alert('로그인이 필요합니다.');
      navigate('/login');
      return;
    }

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
  }, [postId, userId, navigate]);

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
    setNewCommentContent('');
  };

  const handleNewCommentChange = (e) => {
    setNewCommentContent(e.target.value);
  };

  const handleNewCommentSubmit = async () => {
    if (newCommentContent.trim() === '') {
      alert('댓글을 입력하세요.');
      return;
    }

    try {
      const response = await axios.post(`http://localhost:8080/api/general/comment?forum_id=1&general_id=${postId}`, {
        user_id: userId,
        content: newCommentContent,
      });

      if (response.data.code === 201) {
        const newComment = response.data.result;
        setComments(prevComments => [...prevComments, {
          ...newComment,
          user_id: userId,
          content: newCommentContent,
          creation_date: new Date().toISOString(),
        }]);
        setNewCommentContent('');
        setShowCommentBox(false);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Comment submit error:', error);
      alert('댓글 작성 중 오류가 발생했습니다.');
    }
  };

  const handleCommentEdit = (commentId, content) => {
    setEditingCommentId(commentId);
    setNewCommentContent(content);
    setShowCommentBox(false);
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

  const validateComment = (comment) => {
    if (!comment) return {};
    return {
      id: comment.id || 'Unknown',
      user_id: comment.user_id || 'Unknown',
      content: comment.content || '',
      creation_date: comment.creation_date || new Date().toISOString(),
    };
  };

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
                <span>작성자: {post.user_id}</span>
                <span>작성일: {new Date(post.date).toLocaleDateString()}</span>
              </S.PostMeta>
            </S.PostMetaBox>
            <S.PostContentBox>
              <p>{post.content}</p>
            </S.PostContentBox>
            {(userId === post.user_id || Admin_account === '1') && (
              <S.PostActions>
                <button onClick={handleEditPost}>수정</button>
                <button onClick={handleDeletePost}>삭제</button>
              </S.PostActions>
            )}
            <S.PostActions>
              <button onClick={() => navigate('/board')}>목록으로</button>
            </S.PostActions>
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
              {currentComments.map((comment) => {
                const validatedComment = validateComment(comment);
                return (
                  <S.CommentItem key={validatedComment.id} isAuthor={validatedComment.user_id === post.user_id}>
                    <S.CommentMeta isAuthor={validatedComment.user_id === post.user_id}>
                      <span>작성자: {validatedComment.user_id}</span>
                      <span>작성일: {new Date(validatedComment.creation_date).toLocaleDateString()}</span>
                    </S.CommentMeta>
                    {editingCommentId === validatedComment.id ? (
                      <S.CommentBox>
                        <textarea
                          value={newCommentContent}
                          onChange={handleNewCommentChange}
                        />
                        <button onClick={handleCommentUpdate}>수정</button>
                      </S.CommentBox>
                    ) : (
                      <>
                        <p>{validatedComment.content}</p>
                        {(userId === validatedComment.user_id || Admin_account === '1') && (
                          <S.CommentActions>
                            <button onClick={() => handleCommentEdit(validatedComment.id, validatedComment.content)}>수정</button>
                            <button onClick={() => handleCommentDelete(validatedComment.id)}>삭제</button>
                          </S.CommentActions>
                        )}
                      </>
                    )}
                  </S.CommentItem>
                );
              })}
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
