module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      name: {
        type: String,
        minlength: 1,
        required: true
      },
      username: {
        type: String,
        minlength: 1,
        required: true
      },
      password: {
        type: String,
        required: true
      },
      accessToken: {
        type: String
      },
      role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserRole"
      }
    }
  );

  return mongoose.model("User", schema);
};