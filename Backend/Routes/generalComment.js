// generalComment.js
// 일반 게시글 댓글 조회/작성/수정/삭제

const express = require("express");
const router = express.Router();
const connection = require('../Database/db');

// id 유효성 검사 함수
const validateId = (table, id, callback) => {
    let query = "select count(*) as count from ?? where id = ?";
    if (table === "Users") query = "select count(*) as count from ?? where user_id = ?";
    connection.query(query, [table, id], (err, results) => {
        if (err) {
            console.error("database query err: ", err);
            return callback(err, false);
        }
        const isValid = results[0].count > 0;
        return callback(null, isValid);
    });
}

// 댓글 작성
const createComment = (req, res) => {
    const general_id = req.query.general_id;
    const { user_id, content } = req.body;
    if (!general_id || !user_id || !content)
        return res.status(400).json({ code: 400, message: "general_id, user_id, content are required" });

    validateId('Generalforum', general_id, (err, isGeneralIdValid) => {
        if (err) return res.status(500).json({ code: 500, message: "database query error" })
        if (!isGeneralIdValid) return res.status(400).json({ code: 400, message: "Invalid general_id" })
        
        validateId('Users', user_id, (err, isUserIdValid) => {
            if (err) return res.status(500).json({ code: 500, message: "database query error" })
            if (!isUserIdValid) return res.status(400).json({ code: 400, message: "Invalid user_id" })

            const query = "insert into Generalcomment (forum_id, user_id, content) values (?, ?, ?)"
            connection.query(query, [general_id, user_id, content], (err, results) => {
                if (err) {
                    console.error("database query error: ", err);
                    return res.status(500).json({ code: 500, message: "database query error" })
                }
                return res.status(201).json({ code: 201, message: "comment created successfully" })
            })
        })
    })
}

// 모든 댓글 조회
const getComments = (req, res) => {
    const general_id = req.query.general_id;
    if (!general_id)
        return res.status(400).json({ code: 400, message: "general_id is required" });

    validateId('Generalforum', general_id, (err, isValid) => {
        if (err) return res.status(500).json({ code: 500, message: "database query error" })
        if (!isValid) return res.status(400).json({ code: 400, message: "Invalid general_id" })

        const query = "select * from Generalcomment where forum_id = ? order by creation_date";
        connection.query(query, [general_id], (err, results) => {
            if (err) {
                console.error("database query error: ", err);
                return res.status(500).json({ code: 500, message: "database query error" })
            }
            return res.status(200).json({
                code: 200,
                message: "ok",
                result: results
            })
        })
    })
}

// 댓글 수정
const updateComment = (req, res) => {
    const comment_id = req.query.comment_id;
    const content = req.body.content;
    if (!comment_id || !content)
        return res.status(400).json({ code: 400, message: "comment_id, content are required" });

    validateId('Generalcomment', comment_id, (err, isValid) => {
        if (err) return res.status(500).json({ status: 500, message: "database query error" });
        if (!isValid) return res.status(400).json({ code: 400, message: "Invalid comment_id" });
        
        const query = "update Generalcomment set content = ? where id = ?"
        connection.query(query, [content, comment_id], (err, results) => {
            if (err) {
                console.error("database query err: ", err);
                return res.status(500).json({ code: 500, message: "database query error" })
            }
            return res.status(200).json({ code: 200, message: "comment updated successfully" })
        })
    })
}

const deleteComment = (req, res) => {
    const comment_id = req.query.comment_id;
    if (!comment_id)
        return res.status(400).json({ code: 400, message: "comment_id is required" });

    validateId('Generalcomment', comment_id, (err, isValid) => {
        if (err) return res.status(500).json({ code: 500, message: "database query error" });
        if (!isValid) return res.status(400).json({ code: 400, message: "Invalid comment_id" });

        const query = "delete from Generalcomment where id = ?";
        connection.query(query, [comment_id], (err, results) => {
            if (err) {
                console.error("database query err: ", err);
                return res.status(500).json({ code: 500, message: "database query error" })
            }
            return res.status(200).json({ code: 200, message: "comment deleted successfully" })
        })
    })
}

router.post("/", createComment);
router.get("/", getComments);
router.put("/", updateComment);
router.delete("/", deleteComment);

module.exports = router;
