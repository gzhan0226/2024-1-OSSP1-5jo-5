const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const connection = require("../Database/db");

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "user_email",
        passwordField: "user_password",
      },
      async (user_email, user_password, done) => {
        try {
          const [exUser] = await new Promise((resolve, reject) => {
            const query = "SELECT * FROM Users WHERE user_email = ?";
            connection.query(query, user_email, (err, results) => {
              if (err) return reject(err);
              resolve(results);
            });
          });
          console.log(exUser);
          if (exUser) {
            const result = await bcrypt.compare(
              user_password,
              exUser.user_password
            );
            if (result) {
              done(null, exUser);
            } else {
              done(null, false, { message: "비밀번호가 일치하지 않습니다." });
            }
          } else {
            done(null, false, { message: "가입되지않은 회원입니다." });
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
