import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./component/common/NavBar";
import MainPage from "./pages/main/MainPage";
import "./App.css";
import SearchResultPage from "./pages/searchResult/SearchResultPage";
import ApiDetailPage from "./pages/apiDetail/ApiDetailPage";
import SignUp from "./pages/signup/signup";
import MyPage from "./pages/mypage/mypage";

const App = () => {
  return (
    <Router>
      <div className="container">
        <NavBar />
        <div className="search-bar">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/allresult" element={<SearchResultPage />} />
            <Route path="/api-details/:id" element={<ApiDetailPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/mypage" element={<MyPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
