module.export = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      // Mysql에서 users로 변경되어 저장
      // id가 기본적으로 들어있다
      email: {
        type: DataTypes.STRING(30), // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
        allowNull: false, // 필수
        unique: true, // 고유한 값
      },
      nickname: {
        type: DataTypes.STRING(30),
        allowNull: false, // 필수
      },
      password: {
        type: DataTypes.STRING(100), // 비밀번호는 암호화를하면 길어짐
        allowNull: false, // 필수
      },
    },
    {
      charset: "utf8", // 한글 저장
      collate: "utf8_general_ci", // 한글 저장
    }
  );
  User.associate = (db) => {};
  return User;
};
