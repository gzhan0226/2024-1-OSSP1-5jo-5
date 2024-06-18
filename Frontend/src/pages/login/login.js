import React, { useState } from 'react';
import axios from 'axios';
import * as S from './loginStyle'; // 이 경로가 맞는지 확인하세요
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8080/login/localLogin', {
        user_email: email,
        user_password: password
      });

      if (response.data.user_id) {
        alert('로그인 성공');
        navigate('/'); // 로그인 성공 시 이동할 페이지
      } else {
        alert(response.data);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message);
      } else {
        alert('로그인 중 오류가 발생했습니다.');
      }
      console.error('Login error:', error);
    }
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
          <S.InputGroup>
            <S.LoginButton onClick={handleLogin}>Login</S.LoginButton>
          </S.InputGroup>
          <S.InputGroup>
            <S.HorizontalButtons>
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
