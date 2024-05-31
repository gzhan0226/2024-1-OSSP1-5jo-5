// server.js
const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./Database/db');

const app = express();
app.use(bodyParser.json());

const questionRoutes = require("./Routes/question");
app.use("/api", questionRoutes);
const generalRoutes = require("./Routes/general");
app.use("/api", generalRoutes);

// 서버 시작
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
