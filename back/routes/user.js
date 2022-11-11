const express = require("express");
const bcrypt = require("bcrypt");
const { User } = require("../models");

const router = express.Router();

// POST/user
router.post("/", async (req, res, next) => {
  try {
    // 공식문서보고 동기인지 비동기인지 확인
    // email 중복 확인
    const exUser = await User.findOne({
        where: {
            email: req.body.email,
        }
    })
    if (exUser){
        return res.status(403).send("이미 사용중인 이메일 입니다.")
    }
    // password 암호화
    const hashedPassword = await bcrypt.hash(req.body.password, 13);
    await User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: hashedPassword,
    });
    res.status(200).send("ok");
  } catch (error) {
    console.log(error);
    // next로 error를 보내면 error를 한번에 처리, express가 알아서 error를 알려줌
    next(error);    // status 500 Server Error
  }
});

module.exports = router;
