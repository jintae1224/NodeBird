const passport = require("passport");
const local = require("./local");
const { User } = require("../models");

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // 처음 로그인 이후에 매번 실행되서 사용자 정보를 DB를 통해 복구함
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findOne({
        where: { id },
      });
      done(null, user); // req.user 안에 넣어줌
    } catch (error) {
      console.error(error);
      done(error);
    }
  });

  local();
};
