const db = require("../models");

exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({ message: "Type can not be empty!" });
    return;
  }

  db.employee_type({
    name: req.body.name
  }).save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the item."
      });
    });    
};

exports.findAll = (req, res) => {
  db.employee_type.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving items."
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

  db.employee_type.findByIdAndUpdate(id, req.body, { useFindAndModify: false , runValidators: true})
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

  db.employee_type.findByIdAndRemove(id)
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