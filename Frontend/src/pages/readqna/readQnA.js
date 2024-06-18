import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import SearchBar from "../../component/common/SearchBar";
import * as S from './readQnAStyle';
import axios from 'axios';

const ReadQnA = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [showAnswerBox, setShowAnswerBox] = useState(false);
  const [newAnswerContent, setNewAnswerContent] = useState('');
  const [editingAnswerId, setEditingAnswerId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const answersPerPage = 5;
  const userId = Cookies.get('user_id');
  const Admin_account = Cookies.get('Admin_account');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/question?forum_id=1&question_id=${postId}`);
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
    const fetchAnswers = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/question/comment?forum_id=1&question_id=${postId}`);
        if (response.data.code === 200) {
          setAnswers(response.data.result);
        } else {
          console.error('Error:', response.data.message);
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchAnswers();
  }, [postId]);

  const handleEditPost = () => {
    navigate('/write', { state: { post, type: 'question' } });
  };

  const handleDeletePost = async () => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/question?forum_id=1&question_id=${postId}`);
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

  const toggleAnswerBox = () => {
    setShowAnswerBox(!showAnswerBox);
    setEditingAnswerId(null);
    setNewAnswerContent('');
  };

  const handleNewAnswerChange = (e) => {
    setNewAnswerContent(e.target.value);
  };

  const handleNewAnswerSubmit = async () => {
    if (newAnswerContent.trim() === '') {
      alert('답변을 입력하세요.');
      return;
    }

    try {
      const response = await axios.post(`http://localhost:8080/api/question/comment?forum_id=1&question_id=${postId}`, {
        user_id: userId,
        content: newAnswerContent,
      });

      if (response.data.code === 201) {
        const newAnswer = response.data.result;
        setAnswers(prevAnswers => [...prevAnswers, {
          ...newAnswer,
          user_id: userId,
          content: newAnswerContent,
          creation_date: new Date().toISOString(),
          isAccepted: false, // Add default isAccepted value
        }]);
        setNewAnswerContent('');
        setShowAnswerBox(false);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Answer submit error:', error);
      alert('답변 작성 중 오류가 발생했습니다.');
    }
  };

  const handleAnswerEdit = (answerId, content) => {
    setEditingAnswerId(answerId);
    setNewAnswerContent(content);
    setShowAnswerBox(false);
  };

  const handleAnswerUpdate = async () => {
    if (newAnswerContent.trim() === '') {
      alert('답변을 입력하세요.');
      return;
    }

    try {
      const response = await axios.put(`http://localhost:8080/api/question/comment?comment_id=${editingAnswerId}`, {
        content: newAnswerContent,
      });

      if (response.data.code === 200) {
        setAnswers(answers.map(answer =>
          answer.id === editingAnswerId ? { ...answer, content: newAnswerContent } : answer
        ));
        setEditingAnswerId(null);
        setNewAnswerContent('');
        setShowAnswerBox(false);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Update error:', error);
      alert('답변 수정 중 오류가 발생했습니다.');
    }
  };

  const handleAnswerDelete = async (answerId) => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/question/comment?comment_id=${answerId}`);
      if (response.data.code === 200) {
        setAnswers(answers.filter(answer => answer.id !== answerId));
        alert(response.data.message);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('답변 삭제 중 오류가 발생했습니다.');
    }
  };

  const handleAcceptAnswer = async (answerId) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/question/comment/accept?comment_id=${answerId}`);
      if (response.data.code === 200) {
        setAnswers(answers.map(answer =>
          answer.id === answerId ? { ...answer, isAccepted: true } : answer
        ));
        alert(response.data.message);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Accept error:', error);
      alert('답변 채택 중 오류가 발생했습니다.');
    }
  };

  const currentAnswers = answers.slice(
    (currentPage - 1) * answersPerPage,
    currentPage * answersPerPage
  );

  const totalAnswerPages = Math.ceil(answers.length / answersPerPage);

  const validateAnswer = (answer) => {
    if (!answer) return {};
    return {
      id: answer.id || 'Unknown',
      user_id: answer.user_id || 'Unknown',
      content: answer.content || '',
      creation_date: answer.creation_date || new Date().toISOString(),
      isAccepted: answer.isAccepted || false,
    };
  };

  if (!post) return <div>Loading...</div>;

  return (
    <S.AppContainer>
      <S.MainContentWrapper>
        <SearchBar />
        <S.MainContent>
          <S.PostContainer>
            <S.PostTitleBox>
              <S.ApiNameWrapper>{post.api_id}</S.ApiNameWrapper>
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
            {(userId === post.user_id || Admin_account === 1) && (
              <S.PostActions>
                <button onClick={handleEditPost}>수정</button>
                <button onClick={handleDeletePost}>삭제</button>
              </S.PostActions>
            )}
            <S.PostActions>
              <button onClick={() => navigate('/board')}>목록으로</button>
            </S.PostActions>
            <S.AnswersSection>
              <S.AnswersHeader>
                <h3>답변</h3>
                {userId !== post.user_id && <button onClick={toggleAnswerBox}>답변 쓰기</button>}
              </S.AnswersHeader>
              {showAnswerBox && (
                <S.AnswerBox>
                  <textarea
                    placeholder="답변을 입력하세요"
                    value={newAnswerContent}
                    onChange={handleNewAnswerChange}
                  />
                  <button onClick={handleNewAnswerSubmit}>{editingAnswerId ? '수정' : '등록'}</button>
                </S.AnswerBox>
              )}
              {currentAnswers.map((answer) => {
                const validatedAnswer = validateAnswer(answer);
                return (
                  <S.AnswerItem key={validatedAnswer.id} isAccepted={validatedAnswer.isAccepted}>
                    <S.AnswerMeta>
                      <span>작성자: {validatedAnswer.user_id}</span>
                      <span>작성일: {new Date(validatedAnswer.creation_date).toLocaleDateString()}</span>
                    </S.AnswerMeta>
                    {editingAnswerId === validatedAnswer.id ? (
                      <S.AnswerBox>
                        <textarea
                          value={newAnswerContent}
                          onChange={handleNewAnswerChange}
                        />
                        <button onClick={handleAnswerUpdate}>수정</button>
                      </S.AnswerBox>
                    ) : (
                      <>
                        <p>{validatedAnswer.content}</p>
                        {!validatedAnswer.isAccepted && (userId === validatedAnswer.user_id || Admin_account === 1) && (
                          <S.AnswerActions>
                            <button onClick={() => handleAnswerEdit(validatedAnswer.id, validatedAnswer.content)}>수정</button>
                            <button onClick={() => handleAnswerDelete(validatedAnswer.id)}>삭제</button>
                          </S.AnswerActions>
                        )}
                        {(userId === post.user_id || Admin_account === 1) && !validatedAnswer.isAccepted && (
                          <S.AnswerActions>
                            <button
                              onClick={() => handleAcceptAnswer(validatedAnswer.id)}
                              style={{ backgroundColor: validatedAnswer.isAccepted ? '#4050d4' : '#5060ff' }}
                            >
                              {validatedAnswer.isAccepted ? '채택됨' : '채택'}
                            </button>
                          </S.AnswerActions>
                        )}
                      </>
                    )}
                  </S.AnswerItem>
                );
              })}
              <S.Pagination>
                {Array.from({ length: totalAnswerPages }, (_, i) => (
                  <S.PaginationButton 
                    key={i + 1} 
                    active={currentPage === i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </S.PaginationButton>
                ))}
              </S.Pagination>
            </S.AnswersSection>
          </S.PostContainer>
        </S.MainContent>
      </S.MainContentWrapper>
    </S.AppContainer>
  );
};

export default ReadQnA;
