import React, { useEffect, useState } from "react";
import * as S from "./Style";
import SearchBar from "../../component/common/SearchBar";
import ProfileBox from "./profileBox";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ApiCard from "../../component/searchResult/ApiCard";

const MyPage = () => {
  const [userData, setUserData] = useState(null);
  const [likedApis, setLikedApis] = useState([]);
  const [enrollApis, setEnrollApis] = useState([]);

  const [error, setError] = useState(null);

  const likeEndpoint = "http://localhost:8080/api/like/list?user_id=1";
  const enrollEndpoint = "http://localhost:8080/api/list?user_id=1";

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/users?user_email=admin@example.com"
        );
        setUserData(response.data.result);
      } catch (err) {
        setError("An error occurred while fetching data");
      }
    };

    const fetchLikedApis = async () => {
      try {
        const response = await axios.get(likeEndpoint);
        setLikedApis(response.data.result.slice(0, 4)); // Get only first 4 items
      } catch (err) {
        setError("An error occurred while fetching liked APIs");
      }
    };

    const fetchEnrollApis = async () => {
      try {
        const response = await axios.get(enrollEndpoint);
        setEnrollApis(response.data.result.slice(0, 4)); // Get only first 4 items
      } catch (err) {
        setError("An error occurred while fetching liked APIs");
      }
    };

    fetchEnrollApis();
    fetchUserData();
    fetchLikedApis();
  }, []);

  const navigate = useNavigate();

  const likeApiClick = () => {
    navigate("/allresult", {
      state: { endpoint: likeEndpoint, resultMessage: "내가 좋아요 누른 API" },
    });
  };

  const enrollApiClick = () => {
    navigate("/allresult", {
      state: { endpoint: enrollEndpoint, resultMessage: "내가 등록한 API" },
    });
  };

  return (
    <S.Container>
      <SearchBar />
      {userData ? (
        <ProfileBox userData={userData} />
      ) : (
        <div>{error ? error : "Loading..."}</div>
      )}
      <S.ApiBox>
        <S.Title>내가 좋아요 누른 API</S.Title>
        <S.CardGrid>
          {likedApis.map((api, index) => (
            <S.CardGridItem key={index}>
              <ApiCard
                icon={api.favicon || "/img/default_api.png"}
                views={api.view}
                title={api.name}
              />
            </S.CardGridItem>
          ))}
        </S.CardGrid>
        <S.More onClick={likeApiClick}>더보기 &gt;</S.More>
      </S.ApiBox>
      <S.ApiBox>
        <S.Title>내가 등록한 API</S.Title>
        <S.CardGrid>
          {enrollApis.map((api, index) => (
            <S.CardGridItem key={index}>
              <ApiCard
                icon={api.favicon || "/img/default_api.png"}
                views={api.view}
                title={api.name}
              />
            </S.CardGridItem>
          ))}
        </S.CardGrid>
        <S.More onClick={enrollApiClick}>더보기 &gt;</S.More>
      </S.ApiBox>
    </S.Container>
  );
};

export default MyPage;
