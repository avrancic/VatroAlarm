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
          type: String,
          minlength: 1,
          required: true
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

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  return mongoose.model("incident", schema);
  };