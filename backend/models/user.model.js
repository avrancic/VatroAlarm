module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      username: {
        type: String,
        minlength: 1,
        required: true
      },
      password: {
          type: String,
          required: true
      },
      name: {
          type: String,
          minlength: 1,
          required: true
      },
      permissions: {
          type: [[String]],
          required: true
      }
    }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  return mongoose.model("user", schema);
};