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
  // 관계 설정
  User.associate = (db) => {
    db.User.hasMany(db.Post); // User가 Post를 여러개 가질수 있다
    db.User.hasMany(db.Comment);
    db.User.belongsToMany(db.Post, { through: "Like", as: "Likerd" });
    db.User.belongsToMany(db.User, {
      through: "Follow",
      as: "Followers",
      foreignKey: "FollowingId",
    });
    db.User.belongsToMany(db.User, {
      through: "Follow",
      as: "Followwings",
      foreignKey: "FollowerId",
    });
    db.Post.belongsTo(db.Post, { as: "Retweet" });
  };
  return User;
};
