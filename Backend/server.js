const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const connection = require('./Database/db.js');


app.use(bodyParser.json());

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


app.listen(8080, () => {
    console.log('http://localhost:8080 에서 서버 실행중')
})


