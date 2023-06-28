const db = require("../models");

const bcrypt = require('bcryptjs');

exports.create = (req, res) => {
  db.user.findOne({ username: req.body.username }).then(data => {
    if (data) res.status(400).send({ message: "User alredy exists!" });

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
        return res.status(400).send({ message: "User cannot be createed!" });
      })
  })
    .catch(err => {
      return res.status(400).send({ message: "Server error!" });
    })
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Data to update can not be empty!" });
  }

  var data = {
    name: req.body.name,
    role: req.body.role
  }

  const password = req.body.password;

  if (password != null && password != "") {
    data.password = bcrypt.hashSync(req.body.password, 8)
  }

  db.user.findByIdAndUpdate(req.params.id, data, { useFindAndModify: false, runValidators: true })
    .then(data => {
      if (!data) {
        return res.status(404).send({message: `User not found!`});
      } else return res.status(200).send({message: `User updated!`});
    })
    .catch(err => {
      return res.status(500).send({ message: "Server error!" });
    });
};

exports.findAll = (req, res) => {
  const usersList = db.user.find({}, "name username").populate('role')
  const usersRolesList = db.user_role.find()

  Promise.all([usersList, usersRolesList]).then((returnedValues) => {
    const [usersListResult, usersRolesListResult] = returnedValues;

    res.status(200).send({
      users: usersListResult,
      userRoles: usersRolesListResult
    })
  }).catch((error) => {
    return res.status(500).json({ message: "Server error!" });
  });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  if (req.userId == id) return res.status(400).send({message: `Cannot delete your own account!`});
 
  db.user.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        return res.status(404).send({message: `User not found!`});
      } else {
        return res.status(200).send({message: `User deleted!`});
      }
    })
    .catch(err => {
      return res.status(500).send({ message: "Server error!" });
    });
};