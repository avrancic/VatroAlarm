const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;

db.user = require("./user.model")(mongoose);
db.vehicle = require("./vehicle.model")(mongoose);

db.incident = require("./incident.model")(mongoose);
db.incident_type = require("./incident_type.model")(mongoose);

db.employee = require("./employee.model")(mongoose);
db.employee_type = require("./employee_type.model")(mongoose);

db.user_role = require("./user_role.model")(mongoose);

module.exports = db;