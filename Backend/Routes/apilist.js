// apilist.js
// api 목록 조회 / top10조회 / api 상세 조회

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
    });
};

const getDetail = (req, res) => {
    const id = req.query.api_id;
    if (!id)
        return res.status(400).json({ code: 400, message: "api_id is required" });
    let query = `
        select a.*,b.base_url 
        from APIspecifics as a
        join APIs as b on a.api_id = b.api_id
        where a.api_id = ?`;
    connection.query(query, id ,async (err, api_res) => {
        if (err) {
            console.error("database query error: ", err);
            return res.status(500).json({ code: 500, message: "database query error" });
        }
        let query = `
            select *
            from Request
            where endpoint_id in (?)`;
        const baseUrl = api_res.base_url;
        let faviconUrl = await getFaviconUrl(api_res[0].base_url);
        const specifics_id = api_res.map(res => res.APIspecifics_id);
        connection.query(query, [specifics_id] ,(err, request_res) => {
            if (err) {
                console.error("database query error: ", err);
                return res.status(500).json({ code: 500, message: "database query error" });
            }
            let query = `
                select *
                from Request
                where endpoint_id in (?)`;
            connection.query(query, [specifics_id] ,(err, respond_res) => {
                if (err) {
                    console.error("database query error: ", err);
                    return res.status(500).json({ code: 500, message: "database query error" });
                }
                
                res.status(200).json({
                    code: 200,
                    message: "ok",
                    favicon : faviconUrl,
                    api_specifics: api_res,
                    request : request_res,
                    respond : respond_res
                });
            });
        });
    });
};

const insertAPIData = async (req, res) => {
    const data = req.body; // 클라이언트로부터 받은 데이터

    if (!data.name || !data.description || !data.category || !data.base_url || !data.pricepolicy || data.example_code_provided === undefined || !data.user_id || !data.endpoints)
        return res.status(400).json({ code: 400, message: "Missing required fields" });

    try {
        const apiInsertQuery = `INSERT INTO APIs (name, description, category, base_url, pricepolicy, example_code_provided, user_id) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        const results = await connection.query(apiInsertQuery, [
            data.name, data.description, data.category, data.base_url, data.pricepolicy, data.example_code_provided ? 1 : 0, data.user_id
        ]);
        const apiId = results.insertId; // 쿼리 결과에서 api_id 추출

        for (const endpoint of data.endpoints) {
            if (!endpoint.base_url || !endpoint.method || !endpoint.example_code || !endpoint.description)
                continue;  // 필수 필드가 누락된 엔드포인트는 스킵

            const specificsInsertQuery = `INSERT INTO APIspecifics (api_id, endpoint, method, example_code, description) VALUES (?, ?, ?, ?, ?)`;
            const specificsResults = await connection.query(specificsInsertQuery, [
                apiId, endpoint.base_url, endpoint.method, endpoint.example_code, endpoint.description
            ]);
            const specificsId = specificsResults.insertId;

            for (const requestParam of endpoint.request) {
                if (!requestParam.parameter || !requestParam.type || requestParam.required === undefined || !requestParam.description)
                    continue;
                const requestInsertQuery = `INSERT INTO Request (endpoint_id, name, type, required, description) VALUES (?, ?, ?, ?, ?)`;
                await connection.query(requestInsertQuery, [
                    specificsId, requestParam.parameter, requestParam.type, requestParam.required ? 1 : 0, requestParam.description
                ]);
            }

            for (const responseField of endpoint.response) {
                if (!responseField.field || !responseField.type || !responseField.description)
                    continue;
                const respondInsertQuery = `INSERT INTO Respond (endpoint_id, name, type, description) VALUES (?, ?, ?, ?)`;
                await connection.query(respondInsertQuery, [
                    specificsId, responseField.field, responseField.type, responseField.description
                ]);
            }
        }

        res.status(200).json({ code: 200, message: "API data inserted successfully" });
    } catch (error) {
        console.error("Database query error: ", error);
        res.status(500).json({ code: 500, message: "Database query error" });
    }
};


router.get("/list", getList);
router.get("/list/top", getTopList);
router.get("/detail", getDetail);
router.post("/detail", insertAPIData);
//router.post("/detail", updateAPIData);

module.exports = router;

/*
{
  "user_id": 1,
  "name": "insert test",
  "description": "insert test",
  "category": "Uinsert testilities",
  "base_url": "https://api.example.com",
  "pricepolicy": "free",
  "example_code_provided": true,
  "endpoints": [
    {
      "base_url": "/endpoint1",
      "method": "GET",
      "example_code": "fetch('https://api.example.com/endpoint1')",
      "description": "This is endpoint 1",
      "request": [
        {
          "parameter": "param1",
          "type": "string",
          "required": true,
          "description": "This is parameter 1"
        },
        {
          "parameter": "param2",
          "type": "number",
          "required": false,
          "description": "This is parameter 2"
        }
      ],
      "response": [
        {
          "field": "field1",
          "type": "string",
          "description": "This is response field 1"
        },
        {
          "field": "field2",
          "type": "number",
          "description": "This is response field 2"
        }
      ]
    },
    {
      "base_url": "/endpoint2",
      "method": "POST",
      "example_code": "fetch('https://api.example.com/endpoint2', { method: 'POST' })",
      "description": "This is endpoint 2",
      "request": [
        {
          "parameter": "paramA",
          "type": "boolean",
          "required": true,
          "description": "This is parameter A"
        },
        {
          "parameter": "paramB",
          "type": "string",
          "required": true,
          "description": "This is parameter B"
        }
      ],
      "response": [
        {
          "field": "fieldA",
          "type": "boolean",
          "description": "This is response field A"
        },
        {
          "field": "fieldB",
          "type": "string",
          "description": "This is response field B"
        }
      ]
    }
  ]
}

*/