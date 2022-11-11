module.export = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      charset: "utf8mb4", // 한글 저장
      collate: "utf8mb4_general_ci", // 한글 저장
    }
  );
  Post.associate = (db) => {
    db.Post.belongsTo(db.User); // Post는 User에 속해있다 = Post하나는 User한명이서만 작성 가능
    db.Post.belongsToMany(db.Hashtag);
    db.Post.hasMany(db.Comment);
    db.Post.hasMany(db.Image);
    db.Post.belongsToMany(db.User, { through: "Like", as: "Likers" }); // through를 통해 중간 테이블 이름을 정할수 있음, as로 별칭을 정함
    // 1:1
    // user.hasOne(userInfo)
    // userInfo.belongsTo(user)
  };
  return Post;
};
