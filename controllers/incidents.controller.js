const db = require("../models");

exports.create = (req, res) => {
    new db.incident({
        created_at: new Date(),
        type: req.body.type,
        description: req.body.description,
        city: req.body.city,
        address: req.body.address,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        vehicles: req.body.vehicles.map(a => a._id),
        employees: req.body.employees.map(a => a._id),
        status: req.body.status,
    }).save()
        .then(() => {
            return res.status(200).send({ message: "Created!" });
        })
        .catch(err => {
            return res.status(500).send({ message: err });
        })
};

exports.findAll = (req, res) => {
    const incidentList = db.incident.find().populate('type').populate('vehicles').populate('employees').populate('status')
    const incidentTypesList = db.incident_type.find()
    const incidentStatusList = db.incident_status.find()

    const employeesList = db.employee.find().populate("type")
    const vehicleList = db.vehicle.find().populate("type")

    Promise.all([incidentList, incidentTypesList, incidentStatusList, employeesList, vehicleList]).then((returnedValues) => {
        const [incidentListResult, incidentTypesListResult, incidentStatusListResult, employeesListResult, vehicleListResult] = returnedValues;

        if (incidentListResult == null || incidentTypesListResult == null || incidentStatusListResult == null || employeesListResult == null || vehicleListResult == null) {
            res.status(500).send({ message: "Error." });
            return;
        }

        res.status(200).send({
            incidents: incidentListResult,
            incidentTypeList: incidentTypesListResult,
            incidentStatusList: incidentStatusListResult,
            employeesList: employeesListResult,
            vehicleList: vehicleListResult
        })
    }).catch((error) => {
        console.log(error)
    });
};

exports.update = (req, res) => {
    const id = req.params.id;

    db.incident.findByIdAndUpdate(id, {
        description: req.body.description,
        city: req.body.city,
        address: req.body.address,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        type: req.body.type,
        vehicles: req.body.vehicles.map(a => a._id),
        employees: req.body.employees.map(a => a._id),
        status: req.body.status,
    }, { useFindAndModify: false, runValidators: true })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update item with id=${id}.`
                });
            } else res.send({ message: "Item updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating item with id=" + id
            });
        });

};

exports.delete = (req, res) => {
    const id = req.params.id;

    db.incident.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete item with id=${id}.`
                });
            } else {
                res.send({
                    message: "Item was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete item with id=" + id
            });
        });
};