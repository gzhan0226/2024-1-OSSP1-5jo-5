import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  const [replyContent, setReplyContent] = useState({});
  const [editingReplyId, setEditingReplyId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const answersPerPage = 5;
  const userId = 'exampleUserId'; // 현재 사용자의 ID를 설정하세요

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

  if (!post) return <div>Loading...</div>;

  const toggleAnswerBox = () => {
    setShowAnswerBox(!showAnswerBox);
    setEditingAnswerId(null);
  };

  const handleNewAnswerChange = (e) => {
    setNewAnswerContent(e.target.value);
  };

  const handleNewAnswerSubmit = async () => {
    if (newAnswerContent.trim() === '') {
      alert('답변을 입력하세요.');
      return;
    }

    // Implement answer submission logic here

    setNewAnswerContent('');
    setShowAnswerBox(false);
  };

  const toggleReplyBox = (answerId) => {
    setAnswers(answers.map(answer =>
      answer.id === answerId
        ? { ...answer, showReplyBox: !answer.showReplyBox }
        : answer
    ));
  };

  const handleReplyChange = (answerId, content) => {
    setReplyContent({ ...replyContent, [answerId]: content });
  };

  const handleReplySubmit = async (answerId) => {
    const content = replyContent[answerId]?.trim();
    if (!content) {
      alert('답글을 입력하세요.');
      return;
    }

    // Implement reply submission logic here

    setReplyContent({ ...replyContent, [answerId]: '' });
  };

  const handleAnswerEdit = (answerId, content) => {
    setEditingAnswerId(answerId);
    setNewAnswerContent(content);
    setShowAnswerBox(true);
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

  const currentAnswers = answers.slice(
    (currentPage - 1) * answersPerPage,
    currentPage * answersPerPage
  );

  const totalAnswerPages = Math.ceil(answers.length / answersPerPage);

  return (
    <S.AppContainer>
      <S.MainContentWrapper>
        <SearchBar />
        <S.MainContent>
          <S.PostContainer>
            <S.PostTitleBox>
              <S.ApiNameWrapper>{post.apiName}</S.ApiNameWrapper>
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
            <S.AnswersSection>
              <S.AnswersHeader>
                <h3>답변</h3>
                <button onClick={toggleAnswerBox}>답변 쓰기</button>
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
              {currentAnswers.map((answer) => (
                <S.AnswerItem key={answer.id} isAccepted={answer.isAccepted}>
                  <S.AnswerMeta>
                    <span>작성자: {answer.authorId}</span>
                    <span>작성일: {answer.date}</span>
                  </S.AnswerMeta>
                  {editingAnswerId === answer.id ? (
                    <S.AnswerBox>
                      <textarea
                        value={newAnswerContent}
                        onChange={handleNewAnswerChange}
                      />
                      <button onClick={handleAnswerUpdate}>수정</button>
                    </S.AnswerBox>
                  ) : (
                    <>
                      <p>{answer.content}</p>
                      {userId === answer.authorId && (
                        <S.AnswerActions>
                          <button onClick={() => handleAnswerEdit(answer.id, answer.content)}>수정</button>
                          <button onClick={() => handleAnswerDelete(answer.id)}>삭제</button>
                        </S.AnswerActions>
                      )}
                      {userId === post.authorId && (
                        <S.AnswerActions>
                          <button onClick={() => toggleReplyBox(answer.id)}>재답변</button>
                          <button style={{ backgroundColor: answer.isAccepted ? '#4050d4' : '#5060ff' }}>
                            {answer.isAccepted ? '채택됨' : '채택'}
                          </button>
                        </S.AnswerActions>
                      )}
                    </>
                  )}
                  {answer.replies && answer.replies.map((reply) => (
                    <S.ReplyItem key={reply.id}>
                      <S.ReplyMeta>
                        <span>작성자: {reply.authorId}</span>
                        <span>작성일: {reply.date}</span>
                      </S.ReplyMeta>
                      {editingReplyId === reply.id ? (
                        <S.ReplyBox>
                          <textarea
                            value={replyContent[answer.id] || ''}
                            onChange={(e) => handleReplyChange(answer.id, e.target.value)}
                          />
                          <button onClick={() => handleReplySubmit(answer.id)}>수정</button>
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
                  {answer.showReplyBox && editingReplyId === null && (
                    <S.ReplyBox>
                      <textarea
                        value={replyContent[answer.id] || ''}
                        onChange={(e) => handleReplyChange(answer.id, e.target.value)}
                        placeholder="재답변을 입력하세요"
                      />
                      <button onClick={() => handleReplySubmit(answer.id)}>등록</button>
                    </S.ReplyBox>
                  )}
                </S.AnswerItem>
              ))}
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
