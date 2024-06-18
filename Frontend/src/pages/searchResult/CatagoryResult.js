import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import ApiCard from "../../component/searchResult/ApiCard";
import DetailedView from "../searchResult/DetailResult";
import * as S from "./Style";
import SearchBar from "../../component/common/SearchBar";

const CategoryResultPage = () => {
  const location = useLocation();
  const [selectedApi, setSelectedApi] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 추가

  const result = location.state?.result || [];
  const totalPages = location.state?.totalPages || 1;
  const resultMessage = location.state?.resultMessage || "전체 API를 검색한 결과";

  const handleApiClick = (api) => {
    setSelectedApi(api);
  };

  const handleCloseDetailView = () => {
    setSelectedApi(null);
  };

  const handlePageChange = (direction) => {
    setCurrentPage((prevPage) => {
      if (direction === "prev" && prevPage > 1) {
        return prevPage - 1;
      } else if (direction === "next") {
        return prevPage + 1;
      } else {
        return prevPage;
      }
    });
  };

  return (
    <>
      <S.DisplayRow>
        <S.PageContainer>
          <SearchBar isDetailActive={selectedApi !== null} />
          <p style={{ fontSize: "20px", marginLeft: "10%" }}>{resultMessage}</p>
          <S.CardGrid>
            {result.map((api, index) => (
              <S.CardGridItem key={index} onClick={() => handleApiClick(api)}>
                <ApiCard
                  icon={api.favicon || "/img/default_api.png"}
                  views={api.view}
                  title={api.name}
                  description={api.description}
                />
              </S.CardGridItem>
            ))}
          </S.CardGrid>

          <S.Pagination>
            <S.PaginationItem
              onClick={() => handlePageChange("prev")}
              disabled={currentPage === 1}
            >
              이전
            </S.PaginationItem>
            <span>{currentPage}</span>
            <S.PaginationItem
              onClick={() => handlePageChange("next")}
              disabled={currentPage === totalPages}
            >
              다음
            </S.PaginationItem>
          </S.Pagination>
        </S.PageContainer>
        {selectedApi && (
          <DetailedView api={selectedApi} onClose={handleCloseDetailView} />
        )}
      </S.DisplayRow>
    </>
  );
};

export default CategoryResultPage;
