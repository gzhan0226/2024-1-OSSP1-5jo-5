const bcrypt = require("bcrypt");
const connection = require("../Database/db");

module.exports = {
  async localSignup(req, res, next) {
    const { user_name, user_email, user_password, user_password_confirm } =
      req.body;

    try {
      // us_code가 이미 존재하는지 확인
      const [exCode] = await new Promise((resolve, reject) => {
        const query = "SELECT * FROM Users WHERE user_email = ?";
        connection.query(query, user_email, (err, results) => {
          if (err) return reject(err);
          resolve(results);
        });
      });

      if (exCode) {
        return res.status(400).send("회원가입이 이미 되어 있습니다.");
      }
      if (!user_name) {
        return res.status(400).send("닉네임이 필요합니다");
      }
      if (user_password != user_password_confirm) {
        return res.status(400).send("비밀번호 확인 틀렸습니다");
      }

      const hash = await bcrypt.hash(user_password, 12);

      // 새 사용자 정보 삽입
      await new Promise((resolve, reject) => {
        const query =
          "INSERT INTO Users (user_name, user_email, user_password ) VALUES (?, ?, ?)";
        connection.query(
          query,
          [user_name, user_email, hash],
          (err, results) => {
            if (err) return reject(err);
            resolve(results);
          }
        );
      });

      return res.status(200).send("회원가입 완료.");
    } catch (error) {
      console.error(error);
      return res.status(500).send("Internal Server Error");
    }
  },
};
