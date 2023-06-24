const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const server = require('http').createServer(app);

var corsOptions = {
  origin: "http://localhost:8080"
};

const io = require('socket.io')(server, {
  cors: corsOptions
});

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to application." });
});

const db = require("./models");

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");

    const thoughtChangeStream = db.incident.watch();

    thoughtChangeStream.on("change", (change) => {
      switch (change.operationType) {
        case "insert":
          const thought = {
            _id: change.fullDocument._id,
            name: change.fullDocument.name,
            description: change.fullDocument.description,
          };

          io.of("/api/socket").emit("newThought", thought);
          break;

        case "delete":
          io.of("/api/socket").emit("deletedThought", change.documentKey._id);
          break;
      }
    });
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

initial();

require("./routes/users.route")(app);
require("./routes/vehicles.route")(app);
require("./routes/incidents.route")(app);
require("./routes/employees.route")(app);
require("./routes/display.route")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8081;

io.of("/api/socket").on("connection", (socket) => {
  console.log("socket.io: User connected: ", socket.id);

  socket.on("disconnect", () => {
    console.log("socket.io: User disconnected: ", socket.id);
  });

  sendCanges();

  const stream = db.incident.watch();

  stream.on("change", (change) => {
   // sendCanges();
    console.log(change)
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function sendCanges() {
  db.incident.find().populate('type').populate('vehicles').populate('employees').populate('status')
  .then((value) => {
    io.of("/api/socket").emit("displayNewData", value);
  }).catch((error) => {
    console.log(error)
  });
};

function initial() {
  db.user_role.estimatedDocumentCount()
    .then((count) => {
      if (count === 0) {
        db.user_role.insertMany(
          [
            { name: "user" },
            { name: "admin" },
          ]
        )
          .then(() => {
            console.log("Added to user_role initial data.");
          });
      }
    })
    .catch(err => {
      console.log("Error", err);
    });

  db.employee_type.estimatedDocumentCount()
    .then((count) => {
      if (count === 0) {
        db.employee_type.insertMany(
          [
            { name: "Vozač" },
            { name: "Vatrogasac" },
          ]
        )
          .then(() => {
            console.log("Added to employee_type initial data.");
          });
      }
    })
    .catch(err => {
      console.log("Error", err);
    });

  db.vehicle_Type.estimatedDocumentCount()
    .then((count) => {
      if (count === 0) {
        db.vehicle_Type.insertMany(
          [
            { name: "Navalno vozilo" },
            { name: "Autocisterna" },
            { name: "Šumsko vozilo" },
            { name: "Tehničko vozilo" },
            { name: "Kombi za putnike" },
            { name: "Zapovjedno vozilo" },
            { name: "Autoljestve" },
            { name: "Teretni kombi" }
          ]
        )
          .then(() => {
            console.log("Added to vehicle_Type initial data.");
          });
      }
    })
    .catch(err => {
      console.log("Error", err);
    });

  db.incident_type.estimatedDocumentCount()
    .then((count) => {
      if (count === 0) {
        db.incident_type.insertMany(
          [
            { name: "Fire" },
            { name: "Special Service" }
          ]
        )
          .then(() => {
            console.log("Added to Incident_type initial data.");
          });
      }
    })
    .catch(err => {
      console.log("Error", err);
    });

  db.incident_status.estimatedDocumentCount()
    .then((count) => {
      if (count === 0) {
        db.incident_status.insertMany(
          [
            { name: "Open" },
            { name: "Closed" }
          ]
        )
          .then(() => {
            console.log("Added to Incident_type initial data.");
          });
      }
    })
    .catch(err => {
      console.log("Error", err);
    });
}