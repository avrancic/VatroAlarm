const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;

db.users = require("./user.model")(mongoose);
db.employees = require("./employee.model")(mongoose);
db.incidents = require("./incident.model")(mongoose);
db.vehicles = require("./vehicle.model")(mongoose);

module.exports = db;
