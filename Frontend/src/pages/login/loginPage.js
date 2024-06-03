import React from 'react';
import Footer from '../components/Footer';
import './loginPage.css';

function LoginPage() {
  const handleLogin = () => {
    // 로그인 로직 구현
    alert('로그인 로직을 구현하세요.');
  };

  const handleKakaoLogin = () => {
    // 카카오 로그인 로직 구현
    alert('카카오 로그인 로직을 구현하세요.');
  };

  const handleRegister = () => {
    // 회원 가입 페이지로 이동
    window.location.href = './pages/SignInPage';
  };

  return (
    <div className="container">
      <div className="left">
        <div className="inner-box">
          <h1 style={{ fontSize: '24px' }}>Welcome To Dochi API</h1>
          <div className="input-group">
            <input type="text" placeholder="Email" />
          </div>
          <div className="input-group">
            <input type="password" placeholder="Password" />
          </div>
          <div className="input-group">
            <div className="login">
              <button onClick={handleLogin} className="button">Login</button>
            </div>
          </div>
          <div className="input-group">
            <div className="horizontal-buttons">
              <div className="social-login">
                <img src="/img/kakao-icon.png" alt="카카오로 로그인" onClick={handleKakaoLogin} />
              </div>
              <div className="register">
                <div className="register-text">계정이 없으시다면?</div>
                <a onClick={handleRegister}>회원 가입</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="right">
        <div className="box">
          <h1>Experience Whole New World</h1>
          <h2>All in One API</h2>
          <h3>Dochi API</h3>
          <button className="button">Start Now</button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default LoginPage;
