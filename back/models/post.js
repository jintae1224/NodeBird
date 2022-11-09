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
    db.Post.hasMany(db.Comment);
  };
  return Post;
};
