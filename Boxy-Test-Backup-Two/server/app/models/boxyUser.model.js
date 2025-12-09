//set up tutorial schema

module.exports = mongoose => {
  const UserModel = mongoose.model(
    "userModel",
    mongoose.Schema(
      {
      username: String,
      password: String,
      email: String,
      admin: Boolean // default false
      },
      { timestamps: true } // tracks when the user account was made
    )
  );

  return UserModel;
};