import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import SearchBar from '../components/SearchBar';
import Footer from '../components/Footer';
import './boardPage.css';

function BulletinBoard() {
  const [activeTab, setActiveTab] = useState('freeBoard');
  const posts = [
    { title: 'Title 1', content: 'Content 1', date: '2023-06-01', views: 10, comments: 2, api: 'Twitter API' },
  ];

  const renderPost = (post) => (
    <div className="post-item">
      <div>
        <h4>{post.title}</h4>
        <p>{post.content}</p>
      </div>
      <div>
        <p>{post.date}</p>
        <p>Views: {post.views}</p>
        <p>Comments: {post.comments}</p>
        {activeTab === 'questionBoard' && <p>API: {post.api}</p>}
      </div>
    </div>
  );

  return (
    <div className="app-container">
      <NavBar />
      <div className="main-content-wrapper">
        <SearchBar />
        <div className="main-content">
          <div className="tabs">
            <button 
              className={`tab-button ${activeTab === 'freeBoard' ? 'active' : 'inactive'}`}
              onClick={() => setActiveTab('freeBoard')}
            >
              자유게시판
            </button>
            <button 
              className={`tab-button ${activeTab === 'questionBoard' ? 'active' : 'inactive'}`}
              onClick={() => setActiveTab('questionBoard')}
            >
              질문게시판
            </button>
            <button className="write-button">글쓰기</button>
          </div>
          <div className="posts-list">
            {posts.map(renderPost)}
          </div>
          <div className="pagination">
            <button className="active">1</button>
            <button>2</button>
            <button>3</button>
            <button>4</button>
            <button>5</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default BulletinBoard;
