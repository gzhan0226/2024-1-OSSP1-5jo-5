// allapi.js
// api 목록 조회 / top10조회

const express = require("express");
const router = express.Router();
const connection = require('../Database/db');
const fetch = require('node-fetch');
const cheerio = require('cheerio');

const getFaviconUrl = async (baseUrl) => {
  try {
    const response = await fetch(baseUrl);
    const html = await response.text();
    const $ = cheerio.load(html);
    const faviconLink = $("link[rel='shortcut icon'], link[rel='icon']").attr('href');
    if (!faviconLink) {
      return null;
    }
    return new URL(faviconLink, baseUrl).href;
  } catch (e) {
    console.error('Error fetching favicon:', e);
    return null;
  }
}

const getList = (req, res) => {
    const { category, user_id } = req.query;
    
    let conditions = [];
    let queryParams = [];
    if (category) {
        conditions.push("category = ?")
        queryParams.push(category);
    }
    if (user_id) {
        conditions.push("user_id = ?");
        queryParams.push(user_id);
    }

    let query = `select * from APIs`;
    if (conditions.length > 0) {
        query += ` where ${conditions.join(" and ")}`;
    }
    query += ` order by api_id desc`;
    connection.query(query, queryParams, (err, results) => {
        if (err) {
            console.error("database query error: ", err);
            return res.status(500).json({ code: 500, message: "database query error" });
        }
         const promises = results.map(async (api) => {
            const faviconUrl = await getFaviconUrl(api.base_url);
            return { ...api, favicon: faviconUrl };
        });
        Promise.all(promises).then(resultsWithFavicons => {
            res.status(200).json({
                code: 200,
                message: "ok",
                result: resultsWithFavicons
            });
        });
    })
}

const getTopList = (req, res) => {
    const type = req.query.type;
    let show;
    if (!type)
        return res.status(400).json({ code: 400, message: "type is required" });
    if (type === "views") show="view"
    else if (type === "likes") show="likes"
    else return res.status(400).json({ code: 400, message: "Invalid type" });

    const query = `
        select * from APIs
        order by ${show} desc
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

const getDetail = (req, res) => {
    const id = req.query.api_id;
    if (!id)
        return res.status(400).json({ code: 400, message: "api_id is required" });

    const query = `
        select s.*, 
        GROUP_CONCAT(DISTINCT CONCAT('Name: ', r.name, ', Type: ', r.type, ', Required: ', r.required, ', Description: ', r.description) SEPARATOR '; ') AS request_details,
        GROUP_CONCAT(DISTINCT CONCAT('Name: ', p.name, ', Type: ', p.type, ', Description: ', p.description) SEPARATOR '; ') AS response_details
        from APIspecifics s
        left join Request r on s.APIspecifics_id = r.endpoint_id
        left join Respond p on s.APIspecifics_id = p.endpoint_id
        where s.api_id = ?
        group by s.APIspecifics_id;
        `;
    connection.query(query, id ,(err, results) => {
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

router.get("/list", getList);
router.get("/list/top", getTopList);
router.get("/detail", getDetail);

module.exports = router;
