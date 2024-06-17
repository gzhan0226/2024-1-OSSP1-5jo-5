import React, { useState } from 'react';
import * as S from './signupStyle';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = () => {
    if (!validateEmail(email)) {
      setError('잘못된 이메일 형식입니다.');
      return;
    }

    if (email === 'duplicate@example.com') {
      setError('중복된 이메일입니다.');
      return;
    }

    if (password !== passwordConfirm) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    alert('회원가입 성공!');
    setError('');
  };

  const handleCheckUsername = () => {
    alert('유저 네임 중복 확인 로직을 구현하세요.');
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

        {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
        
        <S.SubmitButton onClick={handleSignUp}>Sign Up</S.SubmitButton>
      </S.Form>
    </S.SignUpContainer>
  );
};

export default SignUp;
