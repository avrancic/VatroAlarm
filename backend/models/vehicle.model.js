module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      number: {
        type: String,
        minlength: 1,
        required: true
      },
      plate: {
          type: String,
          minlength: 1,
          required: true
      },
      model: {
          type: String,
          minlength: 1,
          required: true
      },
      type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "VehicleType"
      }
    }
  );

  return mongoose.model("vehicle", schema);
};