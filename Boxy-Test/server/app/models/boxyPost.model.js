//set up tutorial schema

module.exports = mongoose => {
  const Tutorial = mongoose.model(
    "tutorial",
    mongoose.Schema(
      {
        title: String,
        description: String,
        published: Boolean
      },
      { timestamps: true } // gives timestamps for when created without having to use date()
    )
  );

  return Tutorial;
};