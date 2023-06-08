const mongoose = require("mongoose");
const { randomUUID } = require('crypto');

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    permissions: {
        type: [[String]],
        required: true
    }
  })
);

module.exports = User;