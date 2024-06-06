const mysql = require('mysql');
const util = require('util');

require('dotenv').config();
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

// 쿼리 함수 프로미스화
connection.query = util.promisify(connection.query);

module.exports = connection;