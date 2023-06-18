module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      name: {
        type: String,
        minlength: 1,
        required: true
      }
    }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  return mongoose.model("employee_type", schema);
};