import React from 'react';
import * as S from './signupStyle';

const SignUp = () => {
  const handleSignUp = () => {
    // Implement sign-up logic
    alert('Implement sign-up logic.');
  };

  const handleCheckUsername = () => {
    // Implement username check logic
    alert('Implement username check logic.');
  };

  return (
    <S.SignUpContainer>
      <S.Title>Sign-Up to Dochi API</S.Title>
      <S.Form>
        <S.Label>Email</S.Label>
        <S.InputField type="email" />

        <S.Label>Username</S.Label>
        <S.UsernameField>
          <S.UsernameInput type="text" />
          <S.CheckButton onClick={handleCheckUsername}>Confirm</S.CheckButton>
        </S.UsernameField>

        <S.Label>Password</S.Label>
        <S.InputField type="password" />

        <S.Label>Password Confirm</S.Label>
        <S.InputField type="password" />

        <S.SubmitButton onClick={handleSignUp}>Sign Up</S.SubmitButton>
      </S.Form>
    </S.SignUpContainer>
  );
};

export default SignUp;
