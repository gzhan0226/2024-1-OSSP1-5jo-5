// likeApi.js
// 좋아요 / 요청 / 취소 / 여부 확인
// 좋아요 목록

const express = require("express");
const router = express.Router();
const connection = require("../Database/db");

const likeStatus = async (req, res) => {
  const { user_id, api_id } = req.body;
  if (!user_id || !api_id)
    return res
      .status(400)
      .json({ code: 400, message: "user_id, api_id is required" });

  const validCheckQuery = `select * from APIs where api_id = ?`;
  const statusCheckQuery = `select * from likes where user_id = ? and api_id = ?`;
  try {
    const validCheck = await connection.query(validCheckQuery, api_id);
    if (validCheck.length === 0)
      return res.status(400).json({ code: 400, message: "Invalid api_id" });
    const check = await connection.query(statusCheckQuery, [user_id, api_id]);
    const hasLiked = check.length > 0;
    res.status(200).json({ code: 200, message: "ok", hasLiked: hasLiked });
  } catch (error) {
    console.error("database query error: ", error);
    return res.status(500).json({ code: 500, message: "database query error" });
  }
};

const likeAPI = async (req, res) => {
  const { user_id, api_id } = req.body;
  if (!user_id || !api_id)
    return res
      .status(400)
      .json({ code: 400, message: "user_id, api_id is required" });
  const validCheckQuery = `select * from APIs where api_id = ?`;
  const statusCheckQuery = `select * from likes where user_id = ? and api_id = ?`;
  const insertLikeQuery = `insert into likes (user_id, api_id) values (?, ?)`;
  const updateAPIsQuery = `update APIs set likes=likes+1 where api_id = ?`;
  try {
    const validCheck = await connection.query(validCheckQuery, api_id);
    if (validCheck.length === 0)
      return res.status(400).json({ code: 400, message: "Invalid api_id" });
    const statusCheck = await connection.query(statusCheckQuery, [
      user_id,
      api_id,
    ]);
    if (statusCheck.length > 0)
      return res.status(409).json({ code: 409, message: "already liked" });
    await connection.query(insertLikeQuery, [user_id, api_id]);
    await connection.query(updateAPIsQuery, api_id);
    res.status(200).json({ code: 200, message: "liked successfully" });
  } catch (error) {
    console.error("database query error: ", error);
    res.status(500).json({ code: 500, message: "database error" });
  }
};

const unlikeAPI = async (req, res) => {
  const { user_id, api_id } = req.body;
  if (!user_id | !api_id)
    return res.status(400).json({
      code: 400,
      message: "user_id, api_d is required",
    });

  const validCheckQuery = `select * from APIs where api_id = ?`;
  const deleteLikeQuery = `delete from likes where user_id = ? and api_id = ?`;
  const updateAPIsQuery = `update APIs set likes=likes-1 where api_id = ?`;
  try {
    const validCheck = await connection.query(validCheckQuery, api_id);
    if (validCheck.length === 0)
      return res.status(400).json({ code: 400, message: "Invalid api_id" });
    const result = await connection.query(deleteLikeQuery, [user_id, api_id]);
    if (result.affectedRows === 0)
      return res.status(404).json({ code: 404, message: "like not found" });
    connection.query(updateAPIsQuery, api_id);
    res.status(200).json({ code: 200, message: "like removed successfully" });
  } catch (error) {
    console.error("database query error: ", error);
    return res.status(500).json({ code: 500, message: "database query error" });
  }
};

const likeList = async (req, res) => {
  const { user_id, page = 1 } = req.query;
  const pageSize = 9;
  const offset = page ? (page - 1) * pageSize : 0;

  if (!user_id)
    return res.status(400).json({ code: 400, message: "user_id is required" });
  const countQuery = `select count(*) as total from likes where user_id = ?`;
  const query = `select * from APIs join likes
    on APIs.api_id = likes.api_id
    where likes.user_id = ?
    order by likes.like_id desc
    limit ? offset ?`;
  try {
    const [totalCount] = await connection.query(countQuery, user_id);
    const totalItems = totalCount.total;
    const totalPages = Math.ceil(totalItems / pageSize);
    const result = await connection.query(query, [user_id, pageSize, offset]);
    return res.status(200).json({
      code: 200,
      message: "ok",
      totalItems: totalItems,
      totalPages: totalPages,
      result: result,
    });
  } catch (error) {
    console.error("database query erro: ", error);
    return res.status(500).json({ code: 500, message: "database query error" });
  }
};

router.get("/", likeStatus);
router.post("/", likeAPI);
router.delete("/", unlikeAPI);
router.get("/list", likeList);

module.exports = router;
