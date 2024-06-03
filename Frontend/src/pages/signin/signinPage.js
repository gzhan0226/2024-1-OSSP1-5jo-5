import React from 'react';
import Footer from '../components/Footer';
import './signinPage.css';

function SignIn() {
  const handleSignUp = () => {
    // 회원 가입 로직 구현
    alert('회원 가입 로직을 구현하세요.');
  };

  const handleCheckUsername = () => {
    // 유저 네임 중복 확인 로직 구현
    alert('유저 네임 중복 확인 로직을 구현하세요.');
  };

  return (
    <div className="signup-container">
      <h1 className="title">Sign-in to Dochi API</h1>
      <div className="form">
        <div className="label">Email</div>
        <input type="email" className="input-field" />

        <div className="label">Username</div>
        <div className="username-field">
          <input type="text" className="username-input" />
          <button onClick={handleCheckUsername} className="check-button">Confirm</button>
        </div>

        <div className="label">Password</div>
        <input type="password" className="input-field" />

        <div className="label">Password Confirm</div>
        <input type="password" className="input-field" />

        <button onClick={handleSignUp} className="submit-button">Sign Up</button>
      </div>
      <Footer />
    </div>
  );
}

export default SignIn;
