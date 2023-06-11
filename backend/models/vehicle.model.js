module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      number: {
        type: String,
        required: true
      },
      plate: {
          type: String,
          required: true
      },
      model: {
          type: String,
          required: true
      }
    }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  return mongoose.model("vehicle", schema);
};