const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const connection = require('../Database/db.js');

app.use(bodyParser.json());

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
