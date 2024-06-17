import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ApiCard from "../../component/searchResult/ApiCard";
import DetailedView from "../../pages/searchResult/DetailResult";
import * as S from "./Style";
import SearchBar from "../../component/common/SearchBar";

const SearchResultPage = () => {
  const location = useLocation();
  const [selectedApi, setSelectedApi] = useState(null);
  const [apiData, setApiData] = useState([]);

  const endpoint = location.state?.endpoint || "http://localhost:8080/api/list";
  const resultMessage =
    location.state?.resultMessage || "전체 API를 검색한 결과";

  console.log(endpoint);
  useEffect(() => {
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        setApiData(data.result);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setApiData([]);
      });
  }, [endpoint]);

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
          <p style={{ fontSize: "20px", marginLeft: "10%" }}>{resultMessage}</p>
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
