const db = require("../models");

exports.create = (req, res) => {
  if (!req.body.number) {
    res.status(400).send({ message: "Number can not be empty!" });
    return;
  }
  if (!req.body.plate) {
    res.status(400).send({ message: "Plate can not be empty!" });
    return;
  }
  if (!req.body.model) {
    res.status(400).send({ message: "Model can not be empty!" });
    return;
  }
  if (!req.body.type) {
    res.status(400).send({ message: "Type can not be empty!" });
    return;
  }

  db.vehicle_Type.findOne({ name: req.body.type })
  .then(item => {
    new db.vehicle({
      number: req.body.number,
      plate: req.body.plate,
      model: req.body.model,
      type: item._id
    }).save()
      .then(() => {
        return res.status(200).send({ message: "Created!" });
      })
      .catch(err => {
        return res.status(500).send({ message: "Cannot be createed!" });
      })
  })
  .catch(err => {
    return res.status(500).send({ message: "Cannot be createed!" });
  }) 
};

exports.findAll = (req, res) => {
  const plate = req.query.plate;

  var condition = plate ? { plate: { $regex: new RegExp(plate), $options: "i" } } : {};

  db.vehicle.find(condition)
    .populate('type')
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving vehicles."
      });
    });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  db.vehicle.findByIdAndUpdate(id, req.body, { useFindAndModify: false , runValidators: true})
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update vehicle with id=${id}.`
        });
      } else res.send({ message: "Vehicle updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating vehicles with id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  db.vehicle.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete vehicle with id=${id}.`
        });
      } else {
        res.send({
          message: "Vehicle was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete vehicle with id=" + id
      });
    });
};