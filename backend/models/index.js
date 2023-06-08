const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;

db.user = require("./user.model")(mongoose);
db.employees = require("./employees.model")(mongoose);
db.incidents = require("./incidents.model")(mongoose);
db.vehicles = require("./vehicles.model")(mongoose);

module.exports = db;
