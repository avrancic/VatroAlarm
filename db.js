
const db = require("./models");

db.mongoose
.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Connected to the database!");

    init();
})
.catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
});

const init = () => {
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

module.exports = { init }