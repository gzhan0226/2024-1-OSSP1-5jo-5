// login.js
import React, { useState } from 'react';
import * as S from './loginStyle'; // 이 경로가 맞는지 확인하세요
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email === 'test@example.com' && password === 'password123') {
      alert('로그인 성공');
    } else {
      setError('잘못된 이메일 또는 비밀번호입니다.');
    }
  };

  const handleKakaoLogin = () => {
    alert('카카오 로그인 로직을 구현하세요.');
  };

  const handleRegister = () => {
    navigate('/signup'); // 회원가입 페이지로 이동
  };

  return (
    <S.Container>
      <S.Left>
        <S.InnerBox>
          <h1>Welcome To Dochi API</h1>
          <S.InputGroup>
            <S.Input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </S.InputGroup>
          <S.InputGroup>
            <S.Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </S.InputGroup>
          {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
          <S.InputGroup>
            <S.LoginButton onClick={handleLogin}>Login</S.LoginButton>
          </S.InputGroup>
          <S.InputGroup>
            <S.HorizontalButtons>
              <S.SocialLogin>
                <img
                  src="/img/kakao-icon.png"
                  alt="카카오로 로그인"
                  onClick={handleKakaoLogin}
                />
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
