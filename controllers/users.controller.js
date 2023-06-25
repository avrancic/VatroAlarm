const db = require("../models");

const bcrypt = require('bcryptjs');

exports.create = (req, res) => {
  db.user.findOne({
    username: req.body.username
  })
    .then(data => {
      if (data) res.status(400).send({ message: "User alredy exists." });
      new db.user({
        name: req.body.name,
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 8),
        role: req.body.role
      }).save()
        .then(() => {
          return res.status(200).send({ message: "User created!" });
        })
        .catch(err => {
          return res.status(500).send({ message: "Usr cannot be createed!" });
        })
    })
    .catch(err => {
      return res.status(500).send({ message: "Usr cannot be createed!" });
    })
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  var data = {
    name: req.body.name,
    role: req.body.role
  }

  if (req.body.password != null) {
    data.password = bcrypt.hashSync(req.body.password, 8)
  }

  db.user.findByIdAndUpdate(req.params.id, data, { useFindAndModify: false, runValidators: true })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update item with id=${req.params.id}.`
        });
      } else res.send({ message: "Item updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating item with id=" + req.params.id
      });
    });
};

exports.findAll = (req, res) => {
  const usersList = db.user.find({}, "name username").populate('role')
  const usersRolesList = db.user_role.find()

  Promise.all([usersList, usersRolesList]).then((returnedValues) => {
    const [usersListResult, usersRolesListResult] = returnedValues;

    if (usersListResult == null || usersRolesListResult == null) {
      res.status(500).send({ message: "Error." });
      return;
    }

    res.status(200).send({
      users: usersListResult,
      userRoles: usersRolesListResult
    })
  }).catch((error) => {
    console.log(error)
  });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  db.user.findByIdAndRemove(id)
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