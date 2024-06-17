import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import * as S from './readQnAStyle';

const ReadQnA = () => {
  const { postId } = useParams();
  const post = {
    id: postId,
    title: 'React에서 OAuth 통합하는 방법',
    apiName: 'OAuth API',
    authorId: 'author123',
    date: '2024-06-01',
    content: 'React 애플리케이션에서 OAuth 인증을 통합하려고 합니다. 이를 달성하는 방법에 대한 자세한 가이드나 모범 사례를 제공해 주실 수 있나요?',
  };

  const userId = 'user45';
  const [showAnswerBox, setShowAnswerBox] = useState(false);
  const [newAnswerContent, setNewAnswerContent] = useState('');
  const [editingAnswerId, setEditingAnswerId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const answersPerPage = 5;

  const [answers, setAnswers] = useState([
    {
      id: 1,
      authorId: 'user456',
      date: '2024-06-02',
      content: 'React에서 OAuth를 통합하려면 react-oauth2-hook이나 react-oauth 같은 라이브러리를 사용할 수 있습니다. 안전하게 OAuth 토큰을 처리하기 위해 백엔드 서비스를 만들어야 합니다.',
      showReplyBox: false,
      isAccepted: true,
      replies: [
        {
          id: 1.1,
          authorId: 'author123',
          date: '2024-06-03',
          content: '추천해 주셔서 감사합니다. react-oauth2-hook을 사용하는 예시를 제공해 주실 수 있나요?',
        },
      ],
    },
  ]);

  const [replyContent, setReplyContent] = useState({});
  const [editingReplyId, setEditingReplyId] = useState(null);

  const hasUserAnswered = answers.some(answer => answer.authorId === userId);
  const hasUserRepliedToAnswer = (answer) => answer.replies.some(reply => reply.authorId === userId);

  const toggleAnswerBox = () => {
    setShowAnswerBox(!showAnswerBox);
    setEditingAnswerId(null);
  };

  const handleNewAnswerChange = (e) => {
    setNewAnswerContent(e.target.value);
  };

  const handleNewAnswerSubmit = () => {
    if (newAnswerContent.trim() === '') {
      alert('답변을 입력하세요.');
      return;
    }
    if (editingAnswerId) {
      setAnswers(answers.map(answer =>
        answer.id === editingAnswerId
          ? { ...answer, content: newAnswerContent }
          : answer
      ));
      setEditingAnswerId(null);
    } else {
      if (hasUserAnswered || userId === post.authorId) return;

      const newAnswer = {
        id: Date.now(),
        authorId: userId,
        date: new Date().toISOString().split('T')[0],
        content: newAnswerContent,
        showReplyBox: false,
        isAccepted: false,
        replies: [],
      };
      setAnswers([newAnswer, ...answers]);
    }
    setNewAnswerContent('');
    setShowAnswerBox(false);
  };

  const handleEditPost = () => {
    alert('기능 구현 예정: 글 수정');
  };

  const handleDeletePost = () => {
    alert('기능 구현 예정: 글 삭제');
  };

  const handleAnswerDelete = (answerId) => {
    setAnswers(answers.filter(answer => answer.id !== answerId));
  };

  const handleAnswerEdit = (answerId, content) => {
    setEditingAnswerId(answerId);
    setNewAnswerContent(content);
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

  const handleReplySubmit = (answerId) => {
    const content = replyContent[answerId]?.trim();
    if (!content) {
      alert('재답변을 입력하세요.');
      return;
    }
    const answer = answers.find(answer => answer.id === answerId);
    if (editingReplyId) {
      setAnswers(answers.map(answer =>
        answer.id === answerId
          ? {
            ...answer,
            replies: answer.replies.map(reply =>
              reply.id === editingReplyId
                ? { ...reply, content: content }
                : reply
            )
          }
          : answer
      ));
      setEditingReplyId(null);
    } else {
      if (hasUserRepliedToAnswer(answer)) return;

      setAnswers(answers.map(answer =>
        answer.id === answerId
          ? {
            ...answer,
            replies: [{ id: Date.now(), authorId: userId, content: content, date: new Date().toISOString().split('T')[0] }, ...answer.replies],
            showReplyBox: false,
          }
          : answer
      ));
    }
    setReplyContent({ ...replyContent, [answerId]: '' });
  };

  const handleReplyDelete = (answerId, replyId) => {
    setAnswers(answers.map(answer =>
      answer.id === answerId
        ? {
          ...answer,
          replies: answer.replies.filter(reply => reply.id !== replyId),
        }
        : answer
    ));
  };

  const handleReplyEdit = (answerId, reply) => {
    setEditingReplyId(reply.id);
    setReplyContent({ ...replyContent, [answerId]: reply.content });
  };

  const handleAcceptAnswer = (answerId) => {
    setAnswers(answers.map(answer =>
      answer.id === answerId
        ? { ...answer, isAccepted: !answer.isAccepted }
        : answer
    ));
    const acceptedAnswer = answers.find(answer => answer.id === answerId);
    if (!acceptedAnswer.isAccepted) {
      alert('이 글을 채택하셨습니다.');
    } else {
      alert('이 글 채택을 취소하셨습니다.');
    }
  };

  // Sorting answers to ensure accepted answers appear first
  const sortedAnswers = answers.slice().sort((a, b) => b.isAccepted - a.isAccepted || new Date(b.date) - new Date(a.date));

  // Pagination logic for answers
  const indexOfLastAnswer = currentPage * answersPerPage;
  const indexOfFirstAnswer = indexOfLastAnswer - answersPerPage;
  const currentAnswers = sortedAnswers.slice(indexOfFirstAnswer, indexOfLastAnswer);
  const totalAnswerPages = Math.ceil(sortedAnswers.length / answersPerPage);

  return (
    <S.AppContainer>
      <S.MainContentWrapper>
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
                {!hasUserAnswered && userId !== post.authorId && (
                  <button onClick={toggleAnswerBox}>답변 쓰기</button>
                )}
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
                      <button onClick={handleNewAnswerSubmit}>수정</button>
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
                          {!hasUserRepliedToAnswer(answer) && <button onClick={() => toggleReplyBox(answer.id)}>재답변</button>}
                          <button onClick={() => handleAcceptAnswer(answer.id)} style={{ backgroundColor: answer.isAccepted ? '#4050d4' : '#5060ff' }}>
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
                              <button onClick={() => handleReplyEdit(answer.id, reply)}>수정</button>
                              <button onClick={() => handleReplyDelete(answer.id, reply.id)}>삭제</button>
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
