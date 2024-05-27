const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
app.use(bodyParser.json());

// MySQL 데이터베이스 연결 설정
const connection = mysql.createConnection({
  host: "dochi-database.ct0gqo2iq4mj.ap-northeast-2.rds.amazonaws.com",
  user: "dochiadmin",
  password: "sung1105122", // 실제 비밀번호로 교체
  database: "dochidatabase"
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


app.listen(8080, () => {
    console.log('http://localhost:8080 에서 서버 실행중')
})


