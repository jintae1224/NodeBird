const express = require("express");
const postRouter = require("./routes/post");
const userRouter = require("./routes/user");
const postsRouter = require("./routes/posts");
const cors = require("cors");
const db = require("./models");
const app = express();
const passportConfig = require("./passport");
const passport = require("passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

db.sequelize
  .sync()
  .then(() => {
    console.log("db연결 성공");
  })
  .catch(console.error);
passportConfig();

// cors 설정
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Front에서 보낸 데이터를 req.body에 넣어주는 역활
// 위치가 중요함
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// backend에서 upload 폴더를 제공할수 있게 함
// "/" = "http://localhost:3065"
app.use("/", express.static(path.join(__dirname, "upload"))); // 폴더 구조를 하나로 합쳐줌(운영체제 구조때문)
app.get("/", (req, res) => {
  res.send("hello express");
});

app.use("/post", postRouter);
app.use("/user", userRouter);
app.use("/posts", postsRouter);

app.listen(3065, () => {
  console.log("서버 실행중");
});
