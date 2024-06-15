import React, { useState, useEffect } from "react";
import ApiCard from "../../component/searchResult/ApiCard";
import DetailedView from "../../pages/searchResult/DetailResult";
import * as S from "./Style";
import SearchBar from "../../component/common/SearchBar";

const SearchResultPage = () => {
  const [selectedApi, setSelectedApi] = useState(null);
  const [apiData, setApiData] = useState([]); // 초기 상태를 빈 배열로 설정

  useEffect(() => {
    // 컴포넌트가 마운트될 때 API 데이터를 불러옵니다.
    fetch("http://localhost:8080/api/list")
      .then((response) => response.json())
      .then((data) => {
        setApiData(data.result); // API에서 받은 데이터로 상태를 업데이트
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setApiData([]); // 에러 발생 시 상태를 빈 배열로 설정
      });
  }, []); // 의존성 배열을 빈 배열로 설정하여 컴포넌트 마운트 시에만 실행

  const handleApiClick = (api) => {
    setSelectedApi(api);
  };

  const handleCloseDetailView = () => {
    setSelectedApi(null);
  };

  return (
    <>
      <S.DisplayRow>
        <S.PageContainer>
          <SearchBar isDetailActive={selectedApi !== null} />
          <p style={{ fontSize: "20px", marginLeft: "10%" }}>
            전체 API를 검색한 결과
          </p>
          <S.CardGrid>
            {apiData.map((api, index) => (
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
        </S.PageContainer>
        {selectedApi && (
          <DetailedView api={selectedApi} onClose={handleCloseDetailView} />
        )}
      </S.DisplayRow>
    </>
  );
};

export default SearchResultPage;
