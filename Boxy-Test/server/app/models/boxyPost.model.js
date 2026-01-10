//set up post schema

module.exports = mongoose => {
  const Post = mongoose.model(
    "post",
    mongoose.Schema(
      {
        title: String,
        description: String,
        published: Boolean,
        longitude: [Number],
        latitude: [Number],
        username: String,
      },
      { timestamps: true } // gives timestamps for when created without having to use date()
    )
  );

  return Post;
};