module.exports = mongoose => {
  var schema = mongoose.Schema({
      name: String
    });

  return mongoose.model("EmployeeType", schema);
};