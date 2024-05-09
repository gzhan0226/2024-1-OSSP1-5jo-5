import React from 'react';

function Header() {
  return (
    <header className="header">
      <h1>LOGO</h1> {/* 로고 이미지로 대체 가능 */}
      <nav>
        <ul>
          <li>Home</li>
          <li>API 상태 조회</li>
          <li>Q&A</li>
          <li>사이트 소개</li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
