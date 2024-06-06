// server.js
var cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./Database/db');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const apiRoutes = require("./Routes/apilist");
app.use("/api", apiRoutes);
const questionRoutes = require("./Routes/question");
app.use("/api/question", questionRoutes);
const questionCommentRoutes = require("./Routes/questionComment");
app.use("/api/question/comment", questionCommentRoutes);

const generalRoutes = require("./Routes/general");
app.use("/api/general/", generalRoutes);
const generalCommentRoutes = require("./Routes/generalComment");
app.use("/api/general/comment", generalCommentRoutes);

const forumsRoutes = require("./Routes/forums");
app.use("/api/forums", forumsRoutes);

// 서버 시작
const port = 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
