const express = require('express')
const app = express()
const mysql   = require("mysql"); 


app.listen(8080, () => {
    console.log('http://localhost:8080 에서 서버 실행중')
})

app.get('/', (req, res) => {
  res.send('반갑다')
}) 