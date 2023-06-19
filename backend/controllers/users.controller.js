const db = require("../models");

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const jwtSecret = "jwtSecret1234567890";

exports.create = (req, res) => {
  db.user.findOne({
    username: req.body.username
  })
    .then(data => {
      if (data) res.status(400).send({ message: "User alredy exists." });

      db.user_role.findOne({ name: req.body.role })
        .then(role => {
          new db.user({
            name: req.body.name,
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, 8),
            role: role._id
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
    })
};

exports.login = (req, res) => {
  db.user.findOne({
    username: req.body.username
  })
    .then(data => {
      if (!data) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        data.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: data._id }, jwtSecret, {
        expiresIn: 86400 // 24 hours
      });

      return res.status(200).send({
        id: data._id,
        name: data.name,
        username: data.username,
        role: data.role,
        accessToken: token
      });
    })
    .catch((err) => {
      return res.status(500).send({ message: err })
    });
};

exports.findAll = (req, res) => {
  db.user.find({}, "name username permissions")
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