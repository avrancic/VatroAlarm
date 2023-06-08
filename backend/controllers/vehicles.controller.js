const db = require("../models");

// Create and Save a new item
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

  const vehicle = new db.vehicles({
    number: req.body.number,
    plate: req.body.plate,
    model: req.body.model
  });

  vehicle
    .save(vehicle)
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

// Find a single item with an id
exports.findOne = (req, res) => {
  
};

// Update an item by the id in the request
exports.update = (req, res) => {
  
};

// Delete a item with the specified id in the request
exports.delete = (req, res) => {
  
};

// Delete all items from the database.
exports.deleteAll = (req, res) => {
  
};