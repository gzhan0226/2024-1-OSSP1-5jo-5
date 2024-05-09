import React from 'react';
import Header from './component/Header';
import SearchBar from './component/SearchBar';
import APIStatusTable from './component/APIStatusTable';
import UserInfo from './component/UserInfo';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <SearchBar />
      <APIStatusTable />
      <UserInfo />
    </div>
  );
}

export default App;
