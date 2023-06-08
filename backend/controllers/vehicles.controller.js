const db = require("../models");
const Vehicles = require("../models/vehicles.model");

const vehicles = db.vehicles;

// Create and Save a new item
exports.create = (req, res) => {
    if (!req.body.title) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
      }
    
      const vehicles = new Vehicles({
        number: eq.body.number,
        plate: eq.body.plate,
        model: req.body.model
      });
    
      vehicles
        .save(vehicles)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Vehicle."
          });
        });    
};

// Retrieve all items from the database.
exports.findAll = (req, res) => {
  
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