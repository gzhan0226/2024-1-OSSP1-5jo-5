import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import SearchBar from '../components/SearchBar';
import Footer from '../components/Footer';
import './writeBoardPage.css';

const WriteBoard = () => {
  const [boardType, setBoardType] = useState('free');
  const [apiName, setApiName] = useState('');

  return (
    <div className="app-container">
      <NavBar />
      <div className="main-content-wrapper">
        <SearchBar />
        <div className="main-content">
          <div className="container">
            <input 
              type="text" 
              className="title-input" 
              placeholder="제목" 
            />
            <div className="board-type-buttons">
              <button 
                className={`board-type-button ${boardType === 'free' ? 'active' : ''}`}
                onClick={() => setBoardType('free')}
              >
                자유게시판
              </button>
              <button 
                className={`board-type-button ${boardType === 'qna' ? 'active' : ''}`}
                onClick={() => setBoardType('qna')}
              >
                질문게시판
              </button>
            </div>
            {boardType === 'qna' && (
              <input 
                type="text" 
                className="api-name-input" 
                placeholder="참고할 API 이름" 
                value={apiName} 
                onChange={(e) => setApiName(e.target.value)} 
              />
            )}
            <textarea 
              className="content-input"
            />
            <button className="submit-button">등록</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default WriteBoard;
