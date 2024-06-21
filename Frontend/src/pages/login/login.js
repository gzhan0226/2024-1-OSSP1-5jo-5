import React, { useState, useContext } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import * as S from './loginStyle';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../component/user/UserContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const userContext = useContext(UserContext); // Use useContext to access setUser

  // 로그 추가
  console.log('UserContext:', userContext);

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/login/localLogin', {
        user_email: email,
        user_password: password,
      });

      if (response.data.user_id) {
        Cookies.set('user_id', response.data.user_id, { expires: 7 });
        Cookies.set('user_name', response.data.user_name, { expires: 7 });
        Cookies.set('user_email', response.data.user_email, { expires: 7 });
        Cookies.set('levelpoint', response.data.levelpoint, { expires: 7 });
        userContext.setUser(response.data); // UserContext를 업데이트합니다
        alert('로그인 성공');
        navigate('/');
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
    navigate('/signup');
  };

  const handleStartNow = () => {
    navigate('/signup');
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
          <S.StartButton onClick={handleStartNow}>Start Now</S.StartButton>
        </S.Box>
      </S.Right>
    </S.Container>
  );
};

export default Login;
