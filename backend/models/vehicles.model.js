const mongoose = require("mongoose");
const { randomUUID } = require('crypto');

const Vehicles = mongoose.model(
  "Vehicles",
  new mongoose.Schema({
    id: {
        type: 'UUID',
        required: true,
        default: () => randomUUID(),
        index: { unique: true }
    },
    number: {
        type: Number,
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
  })
);

module.exports = Vehicles;