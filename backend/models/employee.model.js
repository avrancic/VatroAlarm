module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      name: {
        type: String,
        minlength: 1,
        required: true
      },
      surname: {
        type: String,
        minlength: 1,
        required: true
      },
      type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "EmployeeType"
      }
    }
  );

  return mongoose.model("employee", schema);
};