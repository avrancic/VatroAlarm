const mongoose = require("mongoose");
const { randomUUID } = require('crypto');

const Employees = mongoose.model(
  "Employees",
  new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    }
  })
);

module.exports = Employees;