// apiData.js
// api 정보 조회 / 등록 / 수정 / 삭제

const express = require("express");
const router = express.Router();
const connection = require("../Database/db");
const fetch = require("node-fetch");
const cheerio = require("cheerio");

const getFaviconUrl = async (baseUrl) => {
  try {
    const response = await fetch(baseUrl);
    const html = await response.text();
    const $ = cheerio.load(html);
    const faviconLink = $("link[rel='shortcut icon'], link[rel='icon']").attr(
      "href"
    );
    if (!faviconLink) {
      return null;
    }
    return new URL(faviconLink, baseUrl).href;
  } catch (e) {
    console.error("Error fetching favicon:", e);
    return null;
  }
};

const getAPIData = async (req, res) => {
  // 조회수 증가됨
  const api_id = req.query.api_id;
  if (!api_id)
    return res.status(400).json({ code: 400, message: "api_id is required" });

  try {
    // APIs 테이블에서 기본 API 정보 가져오기
    const apiQuery = `SELECT * FROM APIs WHERE api_id = ?`;
    const [apiResult] = await connection.query(apiQuery, [api_id]);

    if (!apiResult)
      return res.status(404).json({ code: 404, message: "API not found" });

    // 조회수 증가
    const viewsQuery = "update APIs set view = view + 1 where api_id = ?";
    connection.query(viewsQuery, [api_id]);

    // 파비콘 URL 가져오기
    const faviconUrl = await getFaviconUrl(apiResult.base_url);

    // APIspecifics 테이블에서 해당 API의 엔드포인트 정보 가져오기
    const specificsQuery = `SELECT * FROM APIspecifics WHERE api_id = ?`;
    const specificsResults = await connection.query(specificsQuery, [api_id]);

    // 각 엔드포인트에 대한 요청과 응답 매개변수 정보 가져오기
    const endpoints = await Promise.all(
      specificsResults.map(async (endpoint) => {
        const requestQuery = `SELECT * FROM Request WHERE endpoint_id = ?`;
        const responseQuery = `SELECT * FROM Respond WHERE endpoint_id = ?`;
        const requests = await connection.query(requestQuery, [
          endpoint.APIspecifics_id,
        ]);
        const responses = await connection.query(responseQuery, [
          endpoint.APIspecifics_id,
        ]);

        return {
          ...endpoint,
          requests,
          responses,
        };
      })
    );

    // 최종 JSON 구성
    const data = {
      favicon: faviconUrl,
      ...apiResult,
      endpoints,
    };

    res
      .status(200)
      .json({ code: 200, message: "API data retrieved successfully", data });
  } catch (error) {
    console.error("Database query error: ", error);
    res.status(500).json({ code: 500, message: "Database query error" });
  }
};

const insertAPIData = async (req, res) => {
  const data = req.body;
  if (!req.user) {
    return res.status(401).json({ code: 401, message: "로그인이 필요합니다." });
  }
  const user_id = req.user.user_id;
  if (
    !data.name ||
    !data.description ||
    !data.category ||
    !data.base_url ||
    !data.pricepolicy ||
    data.example_code_provided === undefined ||
    !user_id ||
    !data.endpoints
  )
    return res
      .status(400)
      .json({ code: 400, message: "Missing required fields" });

  try {
    const apiInsertQuery = `INSERT INTO APIs (name, description, category, base_url, pricepolicy, example_code_provided, user_id) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const results = await connection.query(apiInsertQuery, [
      data.name,
      data.description,
      data.category,
      data.base_url,
      data.pricepolicy,
      data.example_code_provided ? 1 : 0,
      user_id,
    ]);
    const apiId = results.insertId;

    for (const endpoint of data.endpoints) {
      if (
        !endpoint.endpoint ||
        !endpoint.method ||
        !endpoint.example_code ||
        !endpoint.description
      )
        continue; // 필수 필드가 누락된 엔드포인트는 스킵

      const specificsInsertQuery = `INSERT INTO APIspecifics (api_id, endpoint, method, example_code, description) VALUES (?, ?, ?, ?, ?)`;
      const specificsResults = await connection.query(specificsInsertQuery, [
        apiId,
        endpoint.endpoint,
        endpoint.method,
        endpoint.example_code,
        endpoint.description,
      ]);
      const specificsId = specificsResults.insertId;

      for (const requestParam of endpoint.request) {
        if (
          !requestParam.parameter ||
          !requestParam.type ||
          requestParam.required === undefined ||
          !requestParam.description
        )
          continue;
        const requestInsertQuery = `INSERT INTO Request (endpoint_id, name, type, required, description) VALUES (?, ?, ?, ?, ?)`;
        await connection.query(requestInsertQuery, [
          specificsId,
          requestParam.parameter,
          requestParam.type,
          requestParam.required ? 1 : 0,
          requestParam.description,
        ]);
      }

      for (const responseField of endpoint.response) {
        if (
          !responseField.field ||
          !responseField.type ||
          !responseField.description
        )
          continue;
        const respondInsertQuery = `INSERT INTO Respond (endpoint_id, name, type, description) VALUES (?, ?, ?, ?)`;
        await connection.query(respondInsertQuery, [
          specificsId,
          responseField.field,
          responseField.type,
          responseField.description,
        ]);
      }
    }
    const levelQuery = `update Users set levelpoint = levelpoint + 1 where user_id = ?`;
    await connection.query(levelQuery, [data.user_id]);

    res
      .status(200)
      .json({ code: 200, message: "API data inserted successfully" });
  } catch (error) {
    console.error("Database query error: ", error);
    res.status(500).json({ code: 500, message: "Database query error" });
  }
};

const deleteAPIData = async (req, res) => {
  const api_id = req.query.api_id;
  if (!api_id)
    return res.status(400).json({ code: 400, message: "api_id is required" });

  try {
    await connection.beginTransaction(); // 트랜잭션 시작
    const deleteAPIsQuery = `delete from APIs where api_id = ?`;
    await connection.query(deleteAPIsQuery, [api_id]);
    await connection.commit(); // 트랜잭션 커밋
    res.status(200).json({ code: 200, message: "API deleted successfully" });
  } catch (error) {
    console.error("database query error: ", error);
    await connection.rollback(); // 오류 발생 시 롤백
    res.status(500).json({ code: 500, message: "database query error" });
  }
};

router.get("/", getAPIData);
router.post("/", insertAPIData);
router.delete("/", deleteAPIData);

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
      "endpoint": "/endpoint1",
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
      "endpoint": "/endpoint2",
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
