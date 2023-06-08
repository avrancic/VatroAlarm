const mongoose = require("mongoose");
const { randomUUID } = require('crypto');

const Incidents = mongoose.model(
  "Incidents",
  new mongoose.Schema({
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
        required: true
    },
    description: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    adress: {
      type: String,
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
})
);

module.exports = Incidents;