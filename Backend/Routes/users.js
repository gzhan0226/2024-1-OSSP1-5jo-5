// allapi.js
// api 목록 조회 / top10조회 / api 상세 조회

const express = require("express");
const router = express.Router();
const connection = require("../Database/db");

const getUser = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ code: 401, message: "로그인이 필요합니다." });
  }
  const user_email = req.user.user_email;
  let query = `
        SELECT * FROM Users WHERE user_email = ?`;
  connection.query(query, [user_email], (err, result) => {
    if (err) {
      console.error("database query error: ", err);
      return res
        .status(500)
        .json({ code: 500, message: "database query error" });
    }
    if (result.length === 0) {
      return res
        .status(404)
        .json({ code: 404, message: "사용자를 찾을 수 없습니다." });
    }
    res.status(200).json({
      code: 200,
      message: "ok",
      result: result[0], // user 정보를 반환
    });
  });
};

const deleteUsers = (req, res) => {
  if (!req.user) {
    return res.status(401).json({ code: 401, message: "로그인이 필요합니다." });
  }
  const id = req.user.user_id;
  if (!id) {
    return res.status(400).json({ message: "user_id is required" });
  }

  let query = "DELETE FROM Users WHERE user_id = ?";
  connection.query(query, id, (err, result) => {
    if (err) {
      console.error("database query error: ", err);
      return res
        .status(500)
        .json({ code: 500, message: "database query error" });
    }

    res.status(200).json({
      code: 200,
      message: "ok",
      result: result,
    });
  });
};

const banUsers = (req, res) => {
  if (!req.user.admin_account) {
    return res
      .status(401)
      .json({ code: 401, message: "관리자 권한이 필요합니다." });
  }
  const id = req.query.user_id;
  if (!id) {
    return res.status(400).json({ message: "user_id is required" });
  }

  let query = "DELETE FROM Users WHERE user_id = ?";
  connection.query(query, id, (err, result) => {
    if (err) {
      console.error("database query error: ", err);
      return res
        .status(500)
        .json({ code: 500, message: "database query error" });
    }

    res.status(200).json({
      code: 200,
      message: "ok",
      result: result,
    });
  });
};

const promoteUsers = (req, res) => {
  if (!req.user.admin_account) {
    return res
      .status(401)
      .json({ code: 401, message: "관리자 권한이 필요합니다." });
  }
  const id = req.query.user_id;
  if (!id) {
    return res.status(400).json({ message: "user_id is required" });
  }
  let query = `update Users set admin_account = 1 where user_id = ?`;
  connection.query(query, id, (err, result) => {
    if (err) {
      console.error("database query error: ", err);
      return res
        .status(500)
        .json({ code: 500, message: "database query error" });
    }

    res.status(200).json({
      code: 200,
      message: "ok",
      result: `successfully changed to User to Admin`,
    });
  });
};

const demoteUsers = (req, res) => {
  if (!req.user.admin_account) {
    return res
      .status(401)
      .json({ code: 401, message: "관리자 권한이 필요합니다." });
  }
  const id = req.query.user_id;
  if (!id) {
    return res.status(400).json({ message: "user_id is required" });
  }
  let query = `update Users set admin_account = 0 where user_id = ?`;
  connection.query(query, id, (err, result) => {
    if (err) {
      console.error("database query error: ", err);
      return res
        .status(500)
        .json({ code: 500, message: "database query error" });
    }

    res.status(200).json({
      code: 200,
      message: "ok",
      result: `successfully changed to Admin to User`,
    });
  });
};

router.get("/", getUser);
router.delete("/delete", deleteUsers);
router.delete("/admin/ban", banUsers);
router.put("/admin/promote", promoteUsers);
router.put("/admin/demote", demoteUsers);

module.exports = router;
