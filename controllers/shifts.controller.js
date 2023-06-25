const db = require("../models");

exports.create = (req, res) => {
    new db.shift({
        started_at: new Date(),
        ends_at: req.body.ends_at,
        employees: req.body.employees.map(a => a._id),
    }).save()
        .then(() => {
            return res.status(200).send({ message: "Created!" });
        })
        .catch(err => {
            return res.status(500).send({ message: err });
        })
};

exports.findAll = (req, res) => {
    const shifts = db.shift.find().populate({ path: 'employees', populate: { path: 'type' } })
    const employees = db.employee.find().populate("type")

    Promise.all([shifts, employees]).then((returnedValues) => {
        const [shifts, employees] = returnedValues;

        if (shifts == null || employees == null) {
            res.status(500).send({ message: "Error." });
            return;
        }

        return res.status(200).send({
            shifts: shifts,
            employees: employees,
        })
    }).catch((error) => {
        console.log(error)
    });
};

exports.update = (req, res) => {
    const id = req.params.id;

    db.shift.findByIdAndUpdate(id, {
        ends_at: req.body.ends_at,
        employees: req.body.employees.map(a => a._id),
    }, { useFindAndModify: false, runValidators: true })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: `Id ${id} not exits.`
                });
            } else return res.send({ message: "Updated successfully." });
        })
        .catch(err => {
            return res.status(500).send({
                message: "Error updating item with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    db.shift.findByIdAndRemove(id)
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