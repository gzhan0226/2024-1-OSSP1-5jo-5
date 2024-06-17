// server.js
var cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const connection = require("./Database/db");

const session = require("express-session");
const passport = require("passport");
const passportConfig = require("./passport");

const app = express();
app.use(bodyParser.json());
app.use(cors());

passportConfig(); // 패스포트 설정

app.use(
  // express-session으로 세션 정의
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SECRET,
    cookie: {
      secure: false,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

const loginRoutes = require("./Routes/login");
app.use("/login", loginRoutes);
const userRoutes = require("./Routes/users");
app.use("/users", userRoutes);
const apiRoutes = require("./Routes/apilist");
app.use("/api/list", apiRoutes);
const apiDataRoutes = require("./Routes/apiData");
app.use("/api/data", apiDataRoutes);
const likeRoutes = require("./Routes/likeApi");
app.use("/api/like", likeRoutes);

// 질문게시글
const questionRoutes = require("./Routes/question");
app.use("/api/question", questionRoutes);
const questionCommentRoutes = require("./Routes/questionComment");
app.use("/api/question/comment", questionCommentRoutes);

// 자유게시글
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
