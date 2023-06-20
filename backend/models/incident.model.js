module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      created_at: {
        type: Date,
        required: true
      },
      ended_at: {
        type: Date,
        required: true
      },
      type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "EmployeeType"
      },
      description: {
        type: String,
        minlength: 1,
        required: true
      },
      city: {
        type: String,
        minlength: 1,
        required: true
      },
      address: {
        type: String,
        minlength: 1,
        required: true
      },
      latitude: {
        type: Number,
        required: true
      },
      longitude: {
        type: Number,
        required: true
      },
      vehiclesId: {
        type: [['UUID']],
        required: true
      },
      employeesId: {
        type: [['UUID']],
        required: true
      },
      status: {/*0 otvoren ili 1 zatvoren*/
        type: Boolean,
        default: () => 0
      }
    }
  );

  return mongoose.model("incident", schema);
  };