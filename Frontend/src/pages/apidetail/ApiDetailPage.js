import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as S from "./style";
import {
  Container, Table, Thead, Tbody, Tr, Th, Td
} from "./style";  // Assuming style.js is in the same directory
import SearchBar from "../../component/common/SearchBar";

const ApiDetailPage = () => {
  const { id } = useParams();
  const [apiDetail, setApiDetail] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [selected, setSelected] = useState(null);

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleGoButtonClick = () => {
    window.location.href = apiDetail.base_url;
  };

  useEffect(() => {
    fetch(`http://localhost:8080/api/data?api_id=${id}`)
      .then(response => response.json())
      .then(data => {
        setApiDetail(data.data);
      })
      .catch(error => {
        console.error("Error fetching API details:", error);
        setApiDetail(null);
      });
  }, [id]);

  const handleEndpointClick = (endpoint) => {
    setSelected(endpoint);
  };

    const renderTable = (data, includeRequired = false) => (
      <Table>
        <Thead>
          <Tr>
            <Th>변수 이름</Th>
            <Th>설명</Th>
            {includeRequired && <Th>필수 여부</Th>}
            <Th>타입</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.sort((a, b) => includeRequired ? b.required - a.required : 0)
            .map((item, index) => (
              <Tr key={index}>
                <Td>{item.name}</Td>
                <Td>{item.description}</Td>
                {includeRequired && (
                  <Td>
                    <S.RequiredTag required={item.required}>
                      {item.required ? "필수" : "선택"}
                    </S.RequiredTag>
                  </Td>
                )}
                <Td>
                  <S.StatusTag {...S.getStatusColor('type', item.type)}>
                    {item.type}
                  </S.StatusTag>
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    );
    
  
  

  if (!apiDetail) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <SearchBar />
      <S.AboutApi>
        <S.ColDiv>
          <S.Favicon src={apiDetail.favicon || "/img/default_api.png"} alt="API Favicon" />
          <p>API 등록자 : {apiDetail.user_id}</p>
          <p>#{apiDetail.pricepolicy} <br/><br/> #{apiDetail.category}</p>
        </S.ColDiv>
        <S.ColDiv>
          <S.Example isProvided={apiDetail.example_code_provided === 1}>
            {apiDetail.example_code_provided === 1 ? "예시코드 제공" : "예시코드 미제공"}
          </S.Example>
          <h2>{apiDetail.name}</h2>
          <p>{apiDetail.description}</p>
        </S.ColDiv>
        <S.ColDiv>
          <S.HeartButton onClick={toggleLike} isLiked={isLiked}>
            {isLiked ? "❤️" : "🤍"}
            
          </S.HeartButton>
          <p><svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-eye"
        >
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
          <circle cx="12" cy="12" r="3"></circle>
          </svg>       {apiDetail.view} Views</p>
          
          <S.GoButton onClick={handleGoButtonClick}>URL 이동</S.GoButton>
        </S.ColDiv>
      </S.AboutApi>


      <S.InfoContainer>
        <S.Endpoint>
          <S.P>ENDPOINT 목록</S.P>
          {apiDetail.endpoints.map((endpoint, index) => (
            <S.EndpointBox key={index} onClick={() => handleEndpointClick(endpoint)}>
              <S.Method>{endpoint.method}</S.Method>
              <p>{endpoint.endpoint}</p>
            </S.EndpointBox>
          ))}
          {selected && (
            <>
              <S.P>클릭한 ENDPOINT에 대한 설명</S.P>
              <S.Description>{selected.description}</S.Description>
              {renderTable(selected.requests, true)}
              {renderTable(selected.responses)}
              
            </>
          )}
        </S.Endpoint>
      </S.InfoContainer>
    </Container>
  );
};

export default ApiDetailPage;
