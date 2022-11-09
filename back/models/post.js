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
  Post.associate = (db) => {};
  return Post;
};