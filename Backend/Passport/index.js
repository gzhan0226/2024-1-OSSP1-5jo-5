//index.js
const passport = require("passport");
const local = require("./localStrategy");
const connection = require("../Database/db");

module.exports = () => {
  // 로그인시 실행되며, req.session에 데이터를 저장 즉, 사용자 정보를 세션에 아이디로 저장함.
  passport.serializeUser((user, done) => {
    done(null, user.user_email);
  });

  // 매 요청시 실행됨. 즉, 세션에 저장한 아이디를 통해 사용자 정보를 불러옴.
  passport.deserializeUser(async (user_email, done) => {
    try {
      const [user] = await new Promise((resolve, reject) => {
        const query = "SELECT * FROM Users WHERE user_email = ?";
        connection.query(query, user_email, (err, results) => {
          if (err) return reject(err);
          resolve(results);
        });
      });
      if (user) {
        done(null, user);
      } else {
        done(new Error("User not found"));
      }
    } catch (err) {
      done(err);
    }
  });

  local();
};
