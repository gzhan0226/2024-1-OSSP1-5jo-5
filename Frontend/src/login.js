import React from 'react';
import './login.css';

function Login() {
  return (
    <div className="login-container">
      <div className="login-form">
        <h1>Welcome To Dochi API</h1>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button className="login-button">LOGIN</button>
        <div className="oauth-buttons">
          <button className="oauth naver">N</button>
          <button className="oauth">G</button>
          <button className="oauth google">G</button>
        </div>
      </div>
      <div className="login-info">
        <h2>Experience Whole New World</h2>
        <p>All in One API</p>
        <p>Dochi API</p>
        <button className="start-now">Start Now</button>
      </div>
    </div>
  );
}

export default Login;
