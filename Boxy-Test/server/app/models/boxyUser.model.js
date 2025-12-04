//set up tutorial schema

module.exports = mongoose => {
  const UserModel = mongoose.model(
    "userModel",
    mongoose.Schema(
      {
      username: String,
      password: String,
      admin: Boolean
      },
      { timestamps: true } // gives timestamps for when created without having to use date()
    )
  );

  return UserModel;
};