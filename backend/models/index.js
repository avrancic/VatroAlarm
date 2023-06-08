const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.employees = require("./employees.model");
db.incidents = require("./incidents.model");
db.vehicles = require("./vehicles.model");

module.exports = db;