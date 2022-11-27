const passport = require("passport");
const local = require("./local");
const { User } = require("../models");

module.exports = () => {
  passport.serializeUser((user, done) => {
    // 서버쪽에 [{ id: 1, cookie: 'clhxy' }]
    console.log(user);
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    console.log(id);
    try {
      const user = await User.findOne({ where: { id } });
      done(null, user); // req.user
      console.log(user);
    } catch (error) {
      console.error(error);
      done(error);
    }
  });

  local();
};
