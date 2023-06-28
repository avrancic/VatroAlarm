const db = require("../models");

exports.create = (req, res) => {
  new db.employee({
    name: req.body.name,
    surname: req.body.surname,
    type: req.body.type
  }).save()
    .then(() => {
      return res.status(200).send({ message: "Employee created!" });
    })
    .catch(err => {
      return res.status(400).send({ message: "Employee cannot be createed!" });
    })
};

exports.findAll = (req, res) => {
  const employees = db.employee.find().populate('type')
  const employeeTypes = db.employee_type.find()

  Promise.all([employees, employeeTypes]).then((returnedValues) => {
    const [employees, employeeTypes] = returnedValues;

    return res.status(200).send({ employees: employees, employeeTypes: employeeTypes })
  }).catch(() => {
    return res.status(500).json({ message: "Server error!" });
  });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Data to update can not be empty!" });
  }

  const id = req.params.id;

  db.employee.findByIdAndUpdate(id, {
    name: req.body.name,
    surname: req.body.surname,
    type: req.body.type
  }, { useFindAndModify: false, runValidators: true })
    .then(data => {
      if (!data) {
        return res.status(404).send({message: `Employee not found!`});
      } else return res.status(200).send({message: `Employee updated!`});
    })
    .catch(err => {
      return res.status(500).send({ message: "Server error!" });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  db.shift.findOne({ employees: req.params.id }).then(data => {
    if (!data) {
      db.employee.findByIdAndRemove(id)
        .then(data => {
          if (!data) {
            return res.status(404).send({message: `Employee not found!`});
          } else {
            return res.status(200).send({message: `Employee deleted!`});
          }
        })
        .catch(() => {
          return res.status(500).send({ message: "Server error!" });
        });
    } else {
      return res.status(400).send({ message: "Cannot delete employee because exists in shifts!" });
    }
  })
    .catch(() => {
      return res.status(500).send({ message: "Server error!" });
    });
};