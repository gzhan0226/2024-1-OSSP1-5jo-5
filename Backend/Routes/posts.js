// posts.js
// 게시판 목록 조회 / top10조회

const express = require("express");
const router = express.Router();
const connection = require('../Database/db');

const getPosts = (req, res) => {
    const { type, page = 1, user_id, api_id } = req.query;
    const pageSize = 10;
    const offset = page ? (page - 1) * pageSize : 0;
    
    if (!type)
        return res.status(400).json({ code: 400, message: "type is required" });
    let table;
    if (type === "question") table = "QAforum";
    else if (type === "general") table = "Generalforum";
    else return res.status(400).json({ code: 400, message: "Invalid type" });

    let conditions = [];
    let queryParams = [];
    if (user_id) {
        conditions.push("user_id = ?")
        queryParams.push(user_id);
    }
    if (api_id && type === "question") {
        conditions.push("api_id = ?");
        queryParams.push(api_id);
    }
    
    let query = `select * from ${table}`;
    if (conditions.length > 0)
        query += ` where ${conditions.join(" and ")}`;
    query += ` order by id desc`;
    if (page) {
        query += ` limit ? offset ?`;
        queryParams.push(pageSize, offset);
    }

    connection.query(query, queryParams, (err, results) => {
        if (err) {
            console.error("database query error: ", err);
            return res.status(500).json({ code: 500, message: "database query error" });
        }
        res.status(200).json({
            code: 200,
            message: "ok",
            result: results
        })
    })
}

const getTopPosts = (req, res) => {
    const type = req.query.type;
    if (!type)
        return res.status(400).json({ code: 400, message: "type is required" });
    let table;
    if (type === "question") table = "QAforum";
    else if (type === "general") table = "Generalforum";
    else return res.status(400).json({ code: 400, message: "Invalid type" });

    const query = `
        select * from ${table}
        where creation_date >= now() - interval 3 day
        order by view desc, id desc
        limit 10`;
    connection.query(query, (err, results) => {
        if (err) {
            console.error("database query error: ", err);
            return res.status(500).json({ code: 500, message: "database query error" });
        }
        res.status(200).json({
            code: 200,
            message: "ok",
            result: results
        });
    });
};

router.get("/", getPosts);
router.get("/top", getTopPosts);

module.exports = router;
