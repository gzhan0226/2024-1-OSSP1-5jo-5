const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
app.use(bodyParser.json());

// MySQL 데이터베이스 연결 설정
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

// 데이터베이스 연결
connection.connect(err => {
  if (err) {
    console.error('MySQL connection error:', err);
    return;
  }
  console.log('MySQL connected...');
});

// 회원가입 API 엔드포인트
app.post('/signup', (req, res) => {
  const { user_name, user_email, user_password } = req.body;

  // 사용자 정보를 데이터베이스에 삽입하는 쿼리
  const query = 'INSERT INTO Users (user_name, user_email, user_password) VALUES (?, ?, ?)';
  connection.query(query, [user_name, user_email, user_password], (err, results) => {
    if (err) {
      console.error('Error signing up:', err);
      res.status(500).send('Error signing up');
      return;
    }

    // 회원가입 성공 시 클라이언트에 응답
    res.status(200).send('Signed up successfully');
  });
});

// 서버 시작
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
