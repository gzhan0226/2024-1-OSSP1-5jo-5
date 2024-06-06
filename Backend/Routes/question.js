// question.js
// 질문 게시판 작성/조회/수정/삭제

const express = require("express");
const router = express.Router();
const connection = require('../Database/db');

// 질문 게시판 작성
const createQuestion = (req, res) => {
  const { api_id, user_id, title, content } = req.body;
  if (!api_id || !user_id || !title || !content)
    return res.status(400).json({ error: "api_id, user_id, title, content are required" });

  const apiCheckQuery = "select * from APIs where api_id = ?";
  connection.query(apiCheckQuery, [api_id], (apiErr, apiResults) => {
    if (apiErr) {
      console.error("database API check error: ", apiErr);
      return res.status(500).json({ code: 500, message: "database error checking API ID" });
    }
    if (apiResults.length === 0) {
      return res.status(400).json({ code: 400, message: "Invalid api_id" });
    }

    const userQuery = "select * from Users where user_id = ?";
    connection.query(userQuery, [user_id], (userErr, userResults) => {
      if (userErr) {
        console.error("database user query error: ", userErr);
        return res.status(500).json({ code: 500, message: "database user query error" });
      }
      if (userResults.length === 0)
        return res.status(400).json({ code: 400, message: "Invalid user_id" });
  
      const QAforumQuery =
        "insert into QAforum (api_id, user_id, title, content) values (?, ?, ?, ?)";
      connection.query(QAforumQuery, [api_id, user_id, title, content], (err, result) => {
          if (err) {
            console.error("database query error: ", err);
            return res.status(500).json({ error: "database query error" });
          }
          res.status(201).json({ code: 201, message: "question created successfully" });
        }
      );
    })
  });
};

// 질문 게시판 상세 조회
const getQuestionDetails = (req, res) => {
  const question_id = req.query.question_id;
  if (!question_id)
    return res.status(400).json({ code: 400, message: "question_id is required" });

  const updateViewQuery = 'UPDATE QAforum SET view = view + 1 WHERE id = ?';
  connection.query(updateViewQuery, [question_id], (updateErr, updateResults) => {
    if(updateErr) {
      console.error("database update view error: ", updateErr);
      return res.status(500).json({ error: "database update view error" });
    }

    const query = `select * from QAforum where id = ?`;
    connection.query(query, [question_id], (err, results) => {
      if (err) {
        console.error("database query error: ", err);
        return res.status(500).json({ code: 500, message: "database query error" });
      }
      if (results.length === 0)
        return res.status(404).json({ code: 404, message: "question not found" });
      const forum = results[0];
  
      res.status(200).json({
        code: 200,
        message: "ok",
        result: forum
      });
    });
  });
};

// 질문 게시판 수정
const updateQuestion = (req, res) => {
  const question_id = req.query.question_id;
  const { title, content } = req.body;
  if (!question_id || !title || !content)
    return res.status(400).json({ code: 400, message: "question_id, title, content is required" });

  const query = "update QAforum set title = ?, content = ? where id = ?";
  connection.query(query, [title, content, question_id], (err, results) => {
    if (err) {
      console.error("database update QAforum query error: ", err);
      return res.status(500).json({ code: 500, message: "database update QAforum query error" });
    }
    if (results.affectedRows === 0)
      return res.status(404).json({ code: 404, message: "question not found" });

    res.status(200).json({ code: 200, message: "question updated successfully" });
  });
};

// 질문 게시판 삭제
const deleteQuestion = (req, res) => {
  const question_id = req.query.question_id;
  if (!question_id)
    return res.status(400).json({ error: "question_id is required" });

  const commentQuery = "delete from QAcomment where forum_id = ?";
  connection.query(commentQuery, [question_id], (commentErr, commentResults) => {
    if (commentErr) {
      console.error("database delete comment error: ", commentErr);
      return res.status(500).json({ code: 500, message: "database delete comment error" });
    }

    const forumQuery = "delete from QAforum where id = ?";
    connection.query(forumQuery, [question_id], (err, results) => {
      if (err) {
        console.error("database question delete query error: ", err);
        return res.status(500).json({code: 500, message: "database question delete query error"});
      }
      if (results.affectedRows === 0)
        return res.status(404).json({ code: 404, message: "question not found" });

      res.status(200).json({ code: 200, message: "question deleted successfully" });
    });
  });
};

router.post("/", createQuestion);
router.get("/", getQuestionDetails);
router.put("/", updateQuestion);
router.delete("/", deleteQuestion);

module.exports = router;
