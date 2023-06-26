const db = require("../models");

exports.create = (req, res) => {
    new db.shift({
        created_at: new Date(),
        employees: req.body.employees.map(a => a._id),
    }).save()
        .then(() => {
            return res.status(200).send({ message: "Shift created!" });
        })
        .catch(err => {
            return res.status(400).send({ message: "Shift cannot be createed!" });
        })
};

exports.findAll = (req, res) => {
    const shifts = db.shift.find().populate({ path: 'employees', populate: { path: 'type' } }).sort([['_id', -1]])
    const employees = db.employee.find().populate("type")

    Promise.all([shifts, employees]).then((returnedValues) => {
        const [shifts, employees] = returnedValues;

        return res.status(200).send({
            shifts: shifts,
            employees: employees,
        })
    }).catch(() => {
        return res.status(500).json({ message: "Server error!" });
    });
};

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: "Data to update can not be empty!" });
    }

    const id = req.params.id;

    var ended_at = null;

    if (String(req.body.status) == 'false') ended_at = new Date();

    db.shift.findByIdAndUpdate(id, {
        ended_at: ended_at,
        employees: req.body.employees.map(a => a._id),
        status: req.body.status
    }, { useFindAndModify: false, runValidators: true })
        .then(data => {
            if (!data) {
                return res.status(404).send({message: `Shift not found!`});
            } else return res.status(200).send({message: `Shift updated!`});
        })
        .catch(err => {
            return res.status(500).send({ message: "Server error!" });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    db.incident.findOne({ shifts: id }).then(data => {
        if (!data) {
            db.shift.findByIdAndRemove(id)
                .then(data => {
                    if (!data) {
                        return res.status(404).send({message: `Shift not found!`});
                    } else {
                        return res.status(200).send({message: `Shift deleted!`});
                    }
                })
                .catch(() => {
                    return res.status(500).send({ message: "Server error!" });
                });
        } else {
            return res.status(400).send({ message: "Cannot delete shift because exists in incidents!" });
        }
    })
        .catch(() => {
            return res.status(500).send({ message: "Server error!" });
        });
};