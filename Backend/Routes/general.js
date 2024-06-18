// general.js
// 자유 게시판 작성/조회/수정/삭제

const express = require("express");
const router = express.Router();
const connection = require("../Database/db");

// 자유 게시판 작성
const createGeneral = (req, res) => {
  if (!req.user) {
    return res.status(401).json({ code: 401, message: "로그인이 필요합니다." });
  }
  const user_id = req.user.user_id;
  const { title, content } = req.body;
  if (!user_id || !title || !content)
    return res
      .status(400)
      .json({ code: 400, message: "user_id, title, content are required" });

  const userQuery = "select * from Users where user_id = ?";
  connection.query(userQuery, [user_id], (userErr, userResults) => {
    if (userErr) {
      console.error("database user query error: ", userErr);
      return res
        .status(500)
        .json({ code: 500, message: "database user query error" });
    }
    if (userResults.length === 0)
      return res.status(400).json({ code: 400, message: "Invalid user_id" });

    const GeneralforumQuery =
      "insert into Generalforum (user_id, title, content) values (?, ?, ?)";
    connection.query(
      GeneralforumQuery,
      [user_id, title, content],
      (err, result) => {
        if (err) {
          console.error("database Generalforum query error: ", err);
          return res
            .status(500)
            .json({ code: 500, message: "database Generalforum query error" });
        }
        res
          .status(201)
          .json({ code: 201, message: "general created successfully" });
      }
    );
  });
};

// 자유 게시판 상세 조회
const getGeneralDetails = (req, res) => {
  const general_id = req.query.general_id;
  if (!general_id)
    return res
      .status(400)
      .json({ code: 400, message: "general_id is required" });

  const updateViewQuery =
    "UPDATE Generalforum SET view = view + 1 WHERE id = ?";
  connection.query(
    updateViewQuery,
    [general_id],
    (updateErr, updateResults) => {
      if (updateErr) {
        console.error("database update view error: ", updateErr);
        return res
          .status(500)
          .json({ code: 500, message: "database update view error" });
      }

      const query = `select * from Generalforum where id = ?`;
      connection.query(query, [general_id], (err, results) => {
        if (err) {
          console.error("database query error: ", err);
          return res
            .status(500)
            .json({ code: 500, message: "database query error" });
        }
        if (results.length === 0)
          return res
            .status(404)
            .json({ code: 404, message: "general not found" });
        const forum = results[0];

        res.status(200).json({
          code: 200,
          message: "ok",
          result: forum,
        });
      });
    }
  );
};

// 질문 게시판 수정
const updateGeneral = (req, res) => {
  if (!req.user) {
    return res.status(401).json({ code: 401, message: "로그인이 필요합니다." });
  }
  const general_id = req.query.general_id;
  const { title, content } = req.body;
  if (!general_id || !title || !content)
    return res
      .status(400)
      .json({ code: 400, message: "general_id, title, content is required" });
  const IDquery = "SELECT user_id FROM Generalforum WHERE id = ?";

  const query = "update Generalforum set title = ?, content = ? where id = ?";
  connection.query(query, [title, content, general_id], (err, results) => {
    if (err) {
      console.error("database update Generalforum query error: ", err);
      return res.status(500).json({
        code: 500,
        message: "database update Generalforum query error",
      });
    }
    if (results.affectedRows === 0)
      return res.status(404).json({ code: 404, message: "general not found" });

    res
      .status(200)
      .json({ code: 200, message: "general updated successfully" });
  });
};

// 자유 게시판 삭제
const deleteGeneral = (req, res) => {
  if (!req.user) {
    return res.status(401).json({ code: 401, message: "로그인이 필요합니다." });
  }
  const general_id = req.query.general_id;
  if (!general_id)
    return res.status(400).json({ code: 400, error: "general_id is required" });

  const commentQuery = "delete from Generalcomment where forum_id = ?";
  connection.query(commentQuery, [general_id], (commentErr, commentResults) => {
    if (commentErr) {
      console.error("database delete comment error: ", commentErr);
      return res
        .status(500)
        .json({ code: 500, message: "database delete comment error" });
    }

    const forumQuery = "delete from Generalforum where id = ?";
    connection.query(forumQuery, [general_id], (err, results) => {
      if (err) {
        console.error("database general delete query error: ", err);
        return res.status(500).json({
          code: 500,
          message: "database general delete query error",
        });
      }
      if (results.affectedRows === 0)
        return res
          .status(404)
          .json({ code: 404, message: "general not found" });

      res
        .status(200)
        .json({ code: 200, message: "general deleted successfully" });
    });
  });
};

router.post("/", createGeneral);
router.get("/", getGeneralDetails);
router.put("/", updateGeneral);
router.delete("/", deleteGeneral);

module.exports = router;
