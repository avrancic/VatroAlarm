const mongoose = require("mongoose");
const { randomUUID } = require('crypto');

const Incidents = mongoose.model(
  "Incidents",
  new mongoose.Schema({
    id: {
        type: 'UUID',
        required: true,
        default: () => randomUUID(),
        index: { unique: true }
    },
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
    coordinates: {
      type: "Point",
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