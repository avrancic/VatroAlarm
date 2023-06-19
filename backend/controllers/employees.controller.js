const db = require("../models");

exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({ message: "Name can not be empty!" });
    return;
  }
  if (!req.body.surname) {
    res.status(400).send({ message: "Surname can not be empty!" });
    return;
  }
  if (!req.body.type) {
    res.status(400).send({ message: "Type can not be empty!" });
    return;
  }

  db.employee({
    name: req.body.name,
    surname: req.body.surname,
    type: req.body.type
  }).save()
    .then(data => {
      res.send({ message: "Employee created!" });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the item."
      });
    });    
};

exports.findAll = (req, res) => {
  db.employee.find()
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

exports.findOne = (req, res) => {
  const id = req.params.id;

  db.employee.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found item with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving item with id=" + id });
    });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  db.employee.findByIdAndUpdate(id, req.body, { useFindAndModify: false , runValidators: true})
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

  db.employee.findByIdAndRemove(id)
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

exports.deleteAll = (req, res) => {
  db.employee.deleteMany({})
  .then(data => {
    res.send({
      message: `${data.deletedCount} Item were deleted successfully!`
    });
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while removing all items."
    });
  });
};