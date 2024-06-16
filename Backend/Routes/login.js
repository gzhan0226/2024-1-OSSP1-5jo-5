const express = require("express");
const passport = require("passport");
const router = express.Router();

const { isLoggedIn, isNotLoggedIn } = require("../auth/isLogged");
const loginService = require("../auth/loginService");

router.post("/localLogin", isNotLoggedIn, async (req, res, next) => {
  passport.authenticate("local", (authError, user, info) => {
    if (authError) {
      console.error(authError);
      res.status(500);
      return next(authError);
    }
    if (!user) {
      res.status(500);
      return res.send(info.message);
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        res.status(500);
        return next(loginError);
      }
      return res.send(user);
    });
  })(req, res, next);
});

router.post("/localSignup", isNotLoggedIn, async (req, res, next) => {
  try {
    const str = await loginService.localSignup(req, res, next);
    if (str === "회원가입이 이미 되어 있습니다.") throw new Error(str);
    res.status(200).send(str);
  } catch (error) {
    res.status(500);
    next(error);
  }
});

router.get("/logout", isLoggedIn, (req, res, next) => {
  req.logOut((error) => {
    if (error) {
      return next(error); // Handle error if logout fails
    }
    req.session.destroy((err) => {
      if (err) {
        return next(err); // Handle error if session destruction fails
      }
      res.status(200).send("로그아웃 완료");
    });
  });
});

module.exports = router;
