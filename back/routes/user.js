const express = require("express");
const bcrypt = require("bcrypt");
const { User, Post } = require("../models");
const passport = require("passport");
const router = express.Router();

router.post("/login", (req, res, next) => {
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

router.post("/user/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  res.send("ok");
});

// POST/user
router.post("/", async (req, res, next) => {
  try {
    // 공식문서보고 동기인지 비동기인지 확인
    // email 중복 확인
    const exUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (exUser) {
      return res.status(403).send("이미 사용중인 이메일 입니다.");
    }
    // password 암호화
    const hashedPassword = await bcrypt.hash(req.body.password, 13);
    await User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: hashedPassword,
    });
    res.status(201).send("ok");
  } catch (error) {
    console.log(error);
    // next로 error를 보내면 error를 한번에 처리, express가 알아서 error를 알려줌
    next(error); // status 500 Server Error
  }
});

module.exports = router;
