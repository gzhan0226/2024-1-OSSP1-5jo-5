// questionComment.js
// 질문 게시글 댓글 조회/작성/수정/삭제

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
    const question_id = req.query.question_id;
    const { user_id, content } = req.body;
    if (!question_id || !user_id || !content)
        return res.status(400).json({ code: 400, message: "question_id, user_id, content are required" });

    validateId('QAforum', question_id, (err, isQAIdValid) => {
        if (err) return res.status(500).json({ code: 500, message: "database query error" })
        if (!isQAIdValid) return res.status(400).json({ code: 400, message: "Invalid question_id" })
        
        validateId('Users', user_id, (err, isUserIdValid) => {
            if (err) return res.status(500).json({ code: 500, message: "database query error" })
            if (!isUserIdValid) return res.status(400).json({ code: 400, message: "Invalid user_id" })

            const query = "insert into QAcomment (forum_id, user_id, content) values (?, ?, ?)"
            connection.query(query, [question_id, user_id, content], (err, results) => {
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
    const question_id = req.query.question_id;
    if (!question_id)
        return res.status(400).json({ code: 400, message: "question_id is required" });

    validateId('QAforum', question_id, (err, isValid) => {
        if (err) return res.status(500).json({ code: 500, message: "database query error" })
        if (!isValid) return res.status(400).json({ code: 400, message: "Invalid question_id" })

        const query = "select * from QAcomment where forum_id = ? order by creation_date";
        connection.query(query, [question_id], (err, results) => {
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

    validateId('QAcomment', comment_id, (err, isValid) => {
        if (err) return res.status(500).json({ status: 500, message: "database query error" });
        if (!isValid) return res.status(400).json({ code: 400, message: "Invalid comment_id" });
        
        const query = "select accepted from QAcomment where id = ?";
        connection.query(query, comment_id, (err, results) => {
            if (err) {
                consoler.error("database query err: ", err);
                return res.status(500).json({ code: 500, message: "database query error" });
            }
            if (results[0].accepted === 1) return res.status(400).json({ code: 400, message: "cannot update accepted comment" })
            
            const updateQuery = "update QAcomment set content = ? where id = ?"
            connection.query(updateQuery, [content, comment_id], (err, results) => {
                if (err) {
                    console.error("database query err: ", err);
                    return res.status(500).json({ code: 500, message: "database query error" })
                }
                return res.status(200).json({ code: 200, message: "comment updated successfully" })
            })
        })
    })
}

const deleteComment = (req, res) => {
    const comment_id = req.query.comment_id;
    if (!comment_id)
        return res.status(400).json({ code: 400, message: "comment_id is required" });

    validateId('QAcomment', comment_id, (err, isValid) => {
        if (err) return res.status(500).json({ code: 500, message: "database query error" });
        if (!isValid) return res.status(400).json({ code: 400, message: "Invalid comment_id" });

        const query = "select accepted from QAcomment where id = ?";
        connection.query(query, [comment_id], (err, results) => {
            if (err) {
                console.error("database query err: ", err);
                return res.status(500).json({ code: 500, message: "database query error" })
            }
            if (results[0].accepted === 1) return res.status(400).json({ code: 400, message: "cannot delete accepted comment" })

            const deleteQuery = "delete from QAcomment where id = ?";
            connection.query(deleteQuery, [comment_id], (err, results) => {
                if (err) {
                    console.error("database query err: ", err);
                    return res.status(500).json({ code: 500, message: "database query error" })
                }
                return res.status(200).json({ code: 200, message: "comment deleted successfully" })
            })
        })
    })
}

const acceptComment = (req, res) => {
    const comment_id = req.query.comment_id;
    if (!comment_id)
        return res.status(400).json({ code: 400, message: "comment_id is required" });

    validateId('QAcomment', comment_id, (err, isValid) => {
        if (err) return res.status(500).json({ code: 500, message: "database query error" })
        if (!isValid) return res.status(400).json({ code: 400, message: "Invalid comment_id" })
        
        const QAforumQuery = "select * from QAcomment where id = ?";
        connection.query(QAforumQuery, [comment_id], (err, QAforumResults) => {
            if (err) {
                console.error("database query error: ", err);
                return res.status(500).json({ code: 500, message: "database query error" });
            }
            if (QAforumResults[0].accepted === 1) return res.status(400).json({ code: 400, message: "comment is already accepted" });

            const query = "update QAcomment set accepted = 1 where id = ?"
            connection.query(query, [comment_id], (err, results) => {
                if (err) {
                    console.error("database query err: ", err);
                    return res.status(500).json({ code: 500, message: "database query error" });
                }
                
                const levelupQuery = "update Users set levelpoint = levelpoint + 1 where user_id = ?";
                connection.query(levelupQuery, [QAforumResults[0].user_id], (err, results) => {
                    if (err) {
                        console.error("database query err: ", err);
                        return res.status(500).json({ code: 500, message: "database query error" })
                    }

                    return res.status(200).json({ code: 200, message: "comment accepted successfully" })
                })
            })
        })
    })
}

router.post("/", createComment);
router.get("/", getComments);
router.put("/", updateComment);
router.delete("/", deleteComment);

router.put("/accept", acceptComment);

module.exports = router;
