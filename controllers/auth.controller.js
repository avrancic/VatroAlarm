const db = require("../models");

exports.login = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.user.findByCredentials(username, password)
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: "Login failed! Check authentication credentials" });
      }

      user.generateAuthToken().then(token => {
        return res.status(200).send({token: token});
      })
    }).catch(err => {
      return res.status(401).json({ error: err });
    });
};