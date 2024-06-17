import React from "react";
import * as S from "./Style";
import { FaUserCircle } from "react-icons/fa";

const ProfileBox = ({ userData }) => {
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
              <S.UserValue>12</S.UserValue>
            </S.UserItem>
            <S.UserItem>
              <S.UserLabel>질문 수</S.UserLabel>
              <S.UserValue>3</S.UserValue>
            </S.UserItem>
            <S.UserItem>
              <S.UserLabel>답변 수</S.UserLabel>
              <S.UserValue>20</S.UserValue>
            </S.UserItem>
          </S.UserContainer>
        </S.Rdiv>
      </S.Cdiv>
    </S.Profile>
  );
};

export default ProfileBox;
