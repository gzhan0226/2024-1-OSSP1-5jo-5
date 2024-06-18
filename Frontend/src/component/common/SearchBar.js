import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  SearchBarContainer,
  Bar,
  SearchInput,
  SearchButton,
  Icon,
} from "./Style";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ isDetailActive }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/list/search`,
        { search: searchTerm }
      );
      const result = response.data.result;
      navigate("/category-result", { state: { result, resultMessage: `${searchTerm} 검색 결과입니다.` } });
    } catch (error) {
      console.error("검색 중 오류 발생:", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <SearchBarContainer style={{ width: isDetailActive ? "60vw" : "84vw" }}>
      <Bar>
        <SearchInput
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="검색하고자하는 API를 입력해보세요!"
        />
        <SearchButton onClick={handleSearch}>
          <Icon as={FaSearch} />
        </SearchButton>
      </Bar>
    </SearchBarContainer>
  );
};

export default SearchBar;
