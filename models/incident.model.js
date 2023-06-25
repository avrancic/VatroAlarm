module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      created_at: {
        type: Date,
        required: true
      },
      type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "IncidentType"
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
      vehicles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vehicle",
        required: true
      }],
      shifts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shift",
        required: true
      }],
      status: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "IncidentStatus",
        required: true
      }
    }
  );

  return mongoose.model("Incident", schema);
  };