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
        shifts: req.body.shifts.map(a => a._id),
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
    const incidents = db.incident.find().populate('type').populate('vehicles').populate('shifts').populate({ path: 'shifts', populate: { path: 'employees', populate: { path: 'type' } } })
        .populate('status').sort( [['_id', -1]] )
    const incidentTypes = db.incident_type.find()
    const incidentStatuses = db.incident_status.find()

    const Shifts = db.shift.find({status: 1}).populate("employees")
    const vehicles = db.vehicle.find().populate("type")

    Promise.all([incidents, incidentTypes, incidentStatuses, Shifts, vehicles]).then((returnedValues) => {
        const [incidents, incidentTypes, incidentStatuses, Shifts, vehicles] = returnedValues;

        if (incidents == null || incidentTypes == null || incidentStatuses == null || Shifts == null || vehicles == null) {
            return res.status(500).send({ message: "Error." });
        }

        return res.status(200).send({
            incidents: incidents,
            incidentTypes: incidentTypes,
            incidentStatuses: incidentStatuses,
            shifts: Shifts,
            vehicles: vehicles
        })
    }).catch((error) => {
        return res.status(500).send({ message: error });
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
        shifts: req.body.shifts.map(a => a._id),
        status: req.body.status,
    }, { useFindAndModify: false, runValidators: true })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: `Cannot update item with id=${id}.`
                });
            } else res.send({ message: "Item updated successfully." });
        })
        .catch(err => {
            return res.status(500).send({
                message: "Error updating item with id=" + id
            });
        });

};

exports.delete = (req, res) => {
    const id = req.params.id;

    db.incident.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                return res.status(404).send({ message: "Cannot delete." });
            } else {
                return res.send({ message: "Deleted successfully!" });
            }
        })
        .catch(() => {
            return res.status(500).send({ message: "Cannot delete" });
        });
};