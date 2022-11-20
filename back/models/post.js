module.exports = (sequelize, DataTypes) => {
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
    db.Post.belongsToMany(db.Hashtag, { through: "PostHashtag" });
    db.Post.hasMany(db.Comment); // post.addComments, post.getComments
    db.Post.hasMany(db.Image); // post.addImages
    db.Post.belongsToMany(db.User, { through: "Like", as: "Likers" }); // through를 통해 중간 테이블 이름을 정할수 있음, as로 별칭을 정함
    // post.addLikers, post.removeLikers
    // 1:1
    // user.hasOne(userInfo)
    // userInfo.belongsTo(user)
    db.Post.belongsTo(db.Post, { as: "Retweet" });
  };
  return Post;
};
