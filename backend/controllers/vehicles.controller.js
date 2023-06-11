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

  db.vehicles({
    number: req.body.number,
    plate: req.body.plate,
    model: req.body.model
  }).save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the vehicle."
      });
    });    
};

exports.findAll = (req, res) => {
  const plate = req.query.plate;
  var condition = plate ? { plate: { $regex: new RegExp(plate), $options: "i" } } : {};

  db.vehicles.find(condition)
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

exports.findOne = (req, res) => {
  const id = req.params.id;

  db.vehicles.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found vehicle with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving vehicle with id=" + id });
    });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  db.vehicles.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
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

  db.vehicles.findByIdAndRemove(id)
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

exports.deleteAll = (req, res) => {
  db.vehicles.deleteMany({})
  .then(data => {
    res.send({
      message: `${data.deletedCount} Vehicles were deleted successfully!`
    });
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while removing all vehicles."
    });
  });
};