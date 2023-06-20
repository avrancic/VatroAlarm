const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8080"
};

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

// set port, listen for requests
const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  db.user_role.estimatedDocumentCount()
    .then((count) => {
      if (count === 0) {
        new db.user_role({
          name: "user"
        }).save()
          .then(() => {
            console.log("added 'user' to roles collection");
          });

        new db.user_role({
          name: "admin"
        }).save()
          .then(() => {
            console.log("added 'admin' to roles collection");
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
        console.log("added 'test1' to employee types collection");
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
        console.log("added 'test1' to employee types collection");
      });
      }
    })
    .catch(err => {
      console.log("Error", err);
    });
}