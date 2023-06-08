const mongoose = require("mongoose");
const { randomUUID } = require('crypto');

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    id: {
        type: 'UUID',
        required: true,
        default: () => randomUUID(),
        index: { unique: true }
    },
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