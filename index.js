const express = require("express");
const history = require('connect-history-api-fallback');
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./models");

const app = express();

const server = require('http').createServer(app);

require("./sockets.js")(server);
require("./db.js");

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const staticFileMiddleware = express.static('public');

// 1st call for unredirected requests 
app.use(staticFileMiddleware);

// Support history api
// this is the HTTP request path not the path on disk
app.use(history({
  index: '/index.html'
}));

// 2nd call for redirected requests
app.use(staticFileMiddleware);

require("./routes/users.route")(app);
require("./routes/vehicles.route")(app);
require("./routes/incidents.route")(app);
require("./routes/employees.route")(app);
require("./routes/display.route")(app);
require("./routes/shifts.route")(app);

const PORT = process.env.PORT || 80;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});