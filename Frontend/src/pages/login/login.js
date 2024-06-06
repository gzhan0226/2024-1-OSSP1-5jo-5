import React from 'react';
import * as S from './loginStyle';

const Login = () => {
  const handleLogin = () => {
    alert('로그인 로직을 구현하세요.');
  };

  const handleKakaoLogin = () => {
    alert('카카오 로그인 로직을 구현하세요.');
  };

  const handleRegister = () => {
    window.location.href = './pages/SignInPage';
  };

  return (
    <S.Container>
      <S.Left>
        <S.InnerBox>
          <h1>Welcome To Dochi API</h1>
          <S.InputGroup>
            <S.Input type="text" placeholder="Email" />
          </S.InputGroup>
          <S.InputGroup>
            <S.Input type="password" placeholder="Password" />
          </S.InputGroup>
          <S.InputGroup>
            <S.LoginButton onClick={handleLogin}>Login</S.LoginButton>
          </S.InputGroup>
          <S.InputGroup>
            <S.HorizontalButtons>
              <S.SocialLogin>
                <img src="/img/kakao-icon.png" alt="카카오로 로그인" onClick={handleKakaoLogin} />
              </S.SocialLogin>
              <S.Register>
                <S.RegisterText>계정이 없으시다면?</S.RegisterText>
                <S.RegisterLink onClick={handleRegister}>회원 가입</S.RegisterLink>
              </S.Register>
            </S.HorizontalButtons>
          </S.InputGroup>
        </S.InnerBox>
      </S.Left>
      <S.Right>
        <S.Box>
          <S.Title>Experience Whole New World</S.Title>
          <S.Subtitle>All in One API</S.Subtitle>
          <S.Text>Dochi API</S.Text>
          <S.StartButton>Start Now</S.StartButton>
        </S.Box>
      </S.Right>
    </S.Container>
  );
};

export default Login;
