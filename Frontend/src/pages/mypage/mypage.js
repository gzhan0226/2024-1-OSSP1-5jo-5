import React, { useEffect, useState } from "react";
import * as S from "./Style";
import SearchBar from "../../component/common/SearchBar";
import ProfileBox from "./profileBox";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ApiCard from "../../component/searchResult/ApiCard";
import Cookies from "js-cookie";

const MyPage = () => {
  const [userData, setUserData] = useState(null);
  const [likedApis, setLikedApis] = useState([]);
  const [enrollApis, setEnrollApis] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [general, setGeneral] = useState([]);
  const [error, setError] = useState(null);

  const userId = Cookies.get('user_id');
  const userEmail = Cookies.get('user_email');

  const likeEndpoint = `http://localhost:8080/api/like/list?user_id=${userId}`;
  const enrollEndpoint = `http://localhost:8080/api/list?user_id=${userId}`;
  const questionEndpoint = `http://localhost:8080/api/forums?type=question&user_id=${userId}`;
  const generalEndpoint = `http://localhost:8080/api/forums?type=general&user_id=${userId}`;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/users?user_email=${userEmail}`);
        setUserData(response.data.result);
      } catch (err) {
        setError("An error occurred while fetching data");
      }
    };

    const fetchLikedApis = async () => {
      try {
        const response = await axios.get(likeEndpoint);
        setLikedApis(response.data.result.slice(0, 4));
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

    const fetchGeneral = async () => {
      try {
        const response = await axios.get(generalEndpoint);
        setGeneral(response.data.result.slice(0, 4));
      } catch (err) {
        setError("An error occurred while fetching general");
      }
    };

    const fetchQuestions = async () => {
      try {
        const response = await axios.get(questionEndpoint);
        setQuestions(response.data.result.slice(0, 4)); // Get only first 4 items
      } catch (err) {
        setError("An error occurred while fetching questions");
      }
    };

    fetchGeneral();
    fetchUserData();
    fetchLikedApis();
    fetchEnrollApis();
    fetchQuestions();
  }, [likeEndpoint, enrollEndpoint, generalEndpoint, questionEndpoint, userEmail]);

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

  const handleCardClick = (id) => {
    navigate(`/api-details/${id}`);
  };

  const handleFreeClick = (id) => {
    navigate(`/readFree/${id}`);
  };

  const handleQnAClick = (id) => {
    navigate(`/readQnA/${id}`);
  };

  const generalPostClick = () => {
    navigate("/mypage/postdetail", {
      state: { endpoint: generalEndpoint },
    });
  };

  const qnaPostClick = () => {
    navigate("/mypage/postdetail", {
      state: { endpoint: questionEndpoint },
    });
  };

  // 말줄임표
  const truncate = (str, maxLength) => {
    return str.length > maxLength ? str.substring(0, maxLength) + "..." : str;
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
        <S.ApiBoxHeader>
          <S.Title>내가 좋아요 누른 API</S.Title>
          <S.More onClick={likeApiClick}>더보기 &gt;</S.More>
        </S.ApiBoxHeader>
        <S.CardGrid>
          {likedApis.map((api, index) => (
            <S.CardGridItem
              key={index}
              onClick={() => handleCardClick(api.api_id)}
            >
              <ApiCard
                icon={api.favicon || "/img/default_api.png"}
                views={api.view}
                title={api.name}
              />
            </S.CardGridItem>
          ))}
        </S.CardGrid>
      </S.ApiBox>
      <S.ApiBox>
        <S.ApiBoxHeader>
          <S.Title>내가 등록한 API</S.Title>
          <S.More onClick={enrollApiClick}>더보기 &gt;</S.More>
        </S.ApiBoxHeader>
        <S.CardGrid>
          {enrollApis.map((api, index) => (
            <S.CardGridItem
              key={index}
              onClick={() => handleCardClick(api.api_id)}
            >
              <ApiCard
                icon={api.favicon || "/img/default_api.png"}
                views={api.view}
                title={api.name}
              />
            </S.CardGridItem>
          ))}
        </S.CardGrid>
      </S.ApiBox>

      <S.ForumContainer>
        <S.ForumBox>
          <S.ForumHeader>
            <S.Title>내가 쓴 글</S.Title>
            <S.More onClick={generalPostClick}>더보기 &gt;</S.More>
          </S.ForumHeader>
          {general.map((general, index) => (
            <S.QuestionItem
              key={index}
              onClick={() => handleFreeClick(general.id)}
            >
              <S.QuestionTitle>{truncate(general.title, 10)}</S.QuestionTitle>
              <S.QuestionDate>
                {new Date(general.creation_date).toLocaleDateString()}
              </S.QuestionDate>
            </S.QuestionItem>
          ))}
        </S.ForumBox>

        <S.ForumBox>
          <S.ForumHeader>
            <S.Title>내가 쓴 질문</S.Title>
            <S.More onClick={qnaPostClick}>더보기 &gt;</S.More>
          </S.ForumHeader>
          {questions.map((question, index) => (
            <S.QuestionItem
              key={index}
              onClick={() => handleQnAClick(question.id)}
            >
              <S.QuestionTitle>{question.title}</S.QuestionTitle>
              <S.QuestionDate>
                {new Date(question.creation_date).toLocaleDateString()}
              </S.QuestionDate>
            </S.QuestionItem>
          ))}
        </S.ForumBox>
      </S.ForumContainer>
    </S.Container>
  );
};

export default MyPage;
