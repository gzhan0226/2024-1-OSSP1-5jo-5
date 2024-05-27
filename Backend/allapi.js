const express = require('express');
const mysql = require('mysql');

const app = express();

// MySQL 데이터베이스 연결 설정
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASEss
});

// 데이터베이스 연결
connection.connect(err => {
  if (err) {
    console.error('MySQL connection error:', err);
    return;
  }
  console.log('MySQL connected...');
});

// 모든 API 정보를 가져와서 보여주는 엔드포인트
app.get('/apis', (req, res) => {
  // 데이터 조회 쿼리 실행
  const query = 'SELECT APIs.*, Users.user_name FROM APIs JOIN Users ON APIs.user_id = Users.user_id';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Error executing query' });
      return;
    }

    // 결과를 JSON 형태로 응답
    res.json(results);
  });
});

// 서버 시작
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
