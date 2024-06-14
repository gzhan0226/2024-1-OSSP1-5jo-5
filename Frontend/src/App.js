import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./component/common/NavBar";
import SearchBar from "./component/common/SearchBar";
import MainPage from "./pages/main/MainPage";
import "./App.css";
import ApiCard from "./component/searchResult/ApiCard"; // Correct import
import SearchResultPage from "./pages/searchResult/SearchResultPage";

const App = () => {
  return (
    <Router>
      <div className="container">
        <NavBar />
        <div className="search-bar">
          <SearchBar />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/result" element={<SearchResultPage />} />

            {/* <Route
              path="/api-card"
              element={
                <ApiCard
                  icon="/img/dochi.png"
                  views={56}
                  title="KaKaoStory API"
                  description="카카오스토리의 게시물을 공유하고, 관리할 수 있는 API"
                />
              }
            /> */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
