// apilist.js
// api 목록 조회 / top10조회
const Categories = {
  1: "건강",
  2: "게임",
  3: "과학",
  4: "교육",
  5: "교통",
  6: "금융",
  7: "날씨",
  8: "뉴스_미디어",
  9: "부동산",
  10: "비디오_이미지",
  11: "쇼핑",
  12: "스포츠",
  13: "식음료",
  14: "에너지",
  15: "예술",
  16: "여행",
  17: "AI",
  18: "SNS",
  19: "IT",
  20: "기타",
};

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
    return null;
  }
};

const getList = async (req, res) => {
  const { user_id, categoryId, page = 1, sort = "newest" } = req.query;
  const pageSize = 9;
  const offset = page ? (page - 1) * pageSize : 0;

  let conditions = [];
  let queryParams = [];
  if (categoryId) {
    conditions.push("category = ?");
    queryParams.push(Categories[categoryId]);
  }
  if (user_id) {
    conditions.push("user_id = ?");
    queryParams.push(user_id);
  }
  let countQuery = `select count(*) as total from APIs`;
  let query = `select * from APIs`;
  if (conditions.length > 0) {
    countQuery += ` where ${conditions.join(" and ")}`;
    query += ` where ${conditions.join(" and ")}`;
  }

  if (sort == "views") query += ` order by view desc, api_id desc`;
  else if (sort == "likes") query += ` order by likes desc, api_id desc`;
  else query += ` order by api_id desc`;

  query += ` limit ? offset ?`;
  queryParams.push(pageSize, offset);

  try {
    const [count] = await connection.query(countQuery, queryParams);
    const totalItems = count.total;
    const totalPages = Math.ceil(totalItems / pageSize);
    const results = await connection.query(query, queryParams);
    const promises = results.map(async (api) => {
      const faviconUrl = await getFaviconUrl(api.base_url);
      return { ...api, favicon: faviconUrl };
    });

    const resultsWithFavicons = await Promise.all(promises);

    res.status(200).json({
      code: 200,
      message: "ok",
      totalItems: totalItems,
      totalPages: totalPages,
      result: resultsWithFavicons,
    });
  } catch (error) {
    console.error("database query error: ", error);
    return res.status(500).json({ code: 500, message: "database query error" });
  }
};

const getTopList = (req, res) => {
  const type = req.query.type;
  let show;
  if (!type)
    return res.status(400).json({ code: 400, message: "type is required" });
  if (type === "views") show = "view";
  else if (type === "likes") show = "likes";
  else return res.status(400).json({ code: 400, message: "Invalid type" });

  const query = `
        select * from APIs
        order by ${show}, api_id desc
        limit 5`;
  connection.query(query, (err, results) => {
    if (err) {
      console.error("database query error: ", err);
      return res
        .status(500)
        .json({ code: 500, message: "database query error" });
    }
    const promises = results.map(async (api) => {
      const faviconUrl = await getFaviconUrl(api.base_url);
      return { ...api, favicon: faviconUrl };
    });
    Promise.all(promises).then((resultsWithFavicons) => {
      res.status(200).json({
        code: 200,
        message: "ok",
        result: resultsWithFavicons,
      });
    });
  });
};

const search = async (req, res) => {
  const word = req.body.search;
  const { page = 1 } = req.query;
  const pageSize = 9;
  const offset = page ? (page - 1) * pageSize : 0;

  if (!word)
    return res
      .status(400)
      .json({ code: 400, message: "word query is required" });

  const terms = word.split(/\s+/).filter((term) => term.length > 0);
  const conditions = terms
    .map(() => `(name like ? or description like ? or category like ?)`)
    .join(` and `);

  const countQuery = `select count(*) as total from APIs where ${conditions}`;
  const searchQuery = `
    select * from APIs
    where ${conditions}
    order by likes desc, api_id desc
    limit ? offset ?`;

  try {
    const queryParams = terms.flatMap((term) => Array(3).fill(`%${term}%`));
    const totalResults = await connection.query(countQuery, queryParams);
    const totalItems = totalResults[0].total;
    const totalPages = Math.ceil(totalItems / pageSize);

    queryParams.push(pageSize, offset);
    const results = await connection.query(searchQuery, queryParams);
    res.status(200).json({
      code: 200,
      message: "ok",
      totalItems: totalItems,
      totalPages: totalPages,
      result: results,
    });
  } catch (error) {
    console.error("database query error: ", error);
    res.status(500).json({ code: 500, message: "database query error" });
  }
};

router.get("/", getList);
router.get("/top", getTopList);
router.post("/search", search);

module.exports = router;
