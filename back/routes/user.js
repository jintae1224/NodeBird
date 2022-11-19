const express = require("express");
const bcrypt = require("bcrypt");
const { User, Post } = require("../models");
const passport = require("passport");
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");

// 내 로그인 정보 매번 불러오기----------
router.get("/", async (req, res, next) => {
  // GET /user
  try {
    if (req.user) {
      const fullUserWithoutPassword = await User.findOne({
        where: { id: req.user.id },
        attributes: {
          exclude: ["password"],
        },
        include: [
          {
            model: Post,
            attributes: ["id"],
          },
          {
            model: User,
            as: "Followings",
            attributes: ["id"],
          },
          {
            model: User,
            as: "Followers",
            attributes: ["id"],
          },
        ],
      });
      res.status(200).json(fullUserWithoutPassword);
    } else {
      res.status(200).json(null);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});
//---------------------------------------------------------

router.post("/login", isNotLoggedIn, (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (info) {
      return res.status(401).send(info.reason);
    }
    // passport login
    // passport에 index.js에 passport.serializeUser가 실행됨
    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }
      const fullUserWithoutPassword = await User.findOne({
        where: { id: user.id },
        // 비밀번호만 빼고 가져오기
        attribute: {
          exclue: ["password"],
        },
        include: [
          // 내 게시물 가져오기
          {
            model: Post,
          },
          // 내 팔로잉 가져오기
          {
            model: User,
            // as는 model에서 as랑 똑같이 써서 가져와야 됨
            as: "Followings",
          },
          // 내 팔로워 가져오기
          {
            model: User,
            as: "Followers",
          },
        ],
      });
      return res.status(200).json(fullUserWithoutPassword);
    });
  })(req, res, next);
});

router.post("/logout", isLoggedIn, (req, res, next) => {
  req.logout();
  req.session.destroy();
  res.send("ok");
});

module.exports = router;
