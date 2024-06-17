import React, { useState, useEffect } from "react";
import * as S from "./Style";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";

const ProfileBox = ({ userData }) => {
  const [totalItems, setTotalItems] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [totalAnswers, setTotalAnswers] = useState(0);
  const user_id = userData.user_id;

  useEffect(() => {
    const fetchTotalItems = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/list?user_id=${user_id}`
        );
        setTotalItems(response.data.totalItems);
      } catch (error) {
        console.error("Error fetching total items:", error);
      }
    };

    const fetchTotalQuestions = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/forums?type=question&user_id=${user_id}`
        );
        setTotalQuestions(response.data.totalItems);
      } catch (error) {
        console.error("Error fetching total questions:", error);
      }
    };

    const fetchTotalAnswers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/question/comment?user_id=${user_id}`
        );
        setTotalAnswers(response.data.totalItems);
      } catch (error) {
        console.error("Error fetching total answers:", error);
      }
    };

    fetchTotalItems();
    fetchTotalQuestions();
    fetchTotalAnswers();
  }, [user_id]);

  return (
    <S.Profile>
      <S.Cdiv>
        <S.Rdiv>
          <FaUserCircle size={70} />
          <S.Cdiv>
            <S.Rdiv>
              <p
                style={{
                  margin: 0,
                  marginTop: "10px",
                  fontWeight: 700,
                  fontSize: "20px",
                  marginLeft: "40px",
                }}
              >
                {userData.user_name}
              </p>
              <p style={{ marginBottom: "8px", marginLeft: "10px" }}>
                {userData.user_id}
              </p>
            </S.Rdiv>
            <S.Level>Level : {userData.levelpoint}</S.Level>
          </S.Cdiv>
        </S.Rdiv>
        <S.Rdiv style={{ marginTop: "15px" }}>
          <S.UserContainer
            style={{
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <S.UserItem first>
              <S.UserLabel>등록 API 수</S.UserLabel>
              <S.UserValue>{totalItems}</S.UserValue>
            </S.UserItem>
            <S.UserItem>
              <S.UserLabel>질문 수</S.UserLabel>
              <S.UserValue>{totalQuestions}</S.UserValue>
            </S.UserItem>
            <S.UserItem>
              <S.UserLabel>답변 수</S.UserLabel>
              <S.UserValue>{totalAnswers}</S.UserValue>
            </S.UserItem>
          </S.UserContainer>
        </S.Rdiv>
      </S.Cdiv>
    </S.Profile>
  );
};

export default ProfileBox;
