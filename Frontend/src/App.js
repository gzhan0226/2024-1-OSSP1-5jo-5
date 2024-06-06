import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './component/common/NavBar';
import SearchBar from './component/common/SearchBar';
import MainPage from './pages/main/MainPage';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="container">
         <NavBar/>
        <div className="search-bar">
          <SearchBar />
          <div> 
            <Routes>
              <Route path="/" element={<MainPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;

