import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as S from './signupStyle';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (!validateEmail(email)) {
      alert('잘못된 이메일 형식입니다.');
      return;
    }

    if (password !== passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/login/localSignup', {
        user_email: email,
        user_name: username,
        user_password: password,
        user_password_confirm: passwordConfirm
      });

      if (response.data) {
        alert(response.data.message);

        if (response.data.code === 200) {
          navigate('/login');
        }
      } else {
        alert('서버 응답이 올바르지 않습니다.');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message);
      } else {
        alert('회원가입 중 오류가 발생했습니다.');
      }
      console.error('Signup error:', error);
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  return (
    <S.SignUpContainer>
      <S.Title>Sign-Up to Dochi API</S.Title>
      <S.Form>
        <S.Label>Email</S.Label>
        <S.InputField type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <S.Label>Username</S.Label>
        <S.UsernameField>
          <S.UsernameInput type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </S.UsernameField>

        <S.Label>Password</S.Label>
        <S.InputField type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <S.Label>Password Confirm</S.Label>
        <S.InputField type="password" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />

        <S.SubmitButton onClick={handleSignUp}>Sign Up</S.SubmitButton>
      </S.Form>
    </S.SignUpContainer>
  );
};

export default SignUp;
