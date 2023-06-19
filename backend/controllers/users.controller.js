const db = require("../models");

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const jwtSecret = "jwtSecret1234567890";

exports.create = (req, res) => {
    const name = req.body.name;
    const username = req.body.username;
    const password = req.body.password;
    const permissions = req.body.permissions;

    if (!name || !username || !password) {
        res.status(400).send({ message: "Please enter all values." });

        return;
    }

    db.users.findOne({ username: username })
        .then((data) => {
            if (data != null) {
                res.status(400).send({ message: "User already exists." });
                return;
            }
        })
        .catch((err) => {
            res.status(500).send({ message: err.message || "Some error occurred." });
            return;
        });

    bcrypt
        .hash(password, 10)
        .then(hash => {
            db.users({
                name: name,
                username: username,
                password: hash,
                accessToken: "",
                permissions: permissions
            }).save()
                .then(data => {
                    res.send({ message: "User created!" });
                })
                .catch(err => {
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while creating the item."
                    });
                });
            })
        .catch(err => res.status(500).send({
            message:
                err.message || "Some error occurred while creating the item."
        }))
};

exports.login = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // check if email exists
    const user = db.users.findOne({
        username: username
    });

    if (user == null) {
        res.status(404).send({ message: "User does not exists." });
        return;
    }

    // check if password is correct
    bcrypt.compare(password, user.password, async function (error, isVerify) {
        if (isVerify) {

            // generate JWT of user
            const accessToken = jwt.sign({
                "userId": user._id.toString()
            }, jwtSecret);

            // update JWT of user in database
            await db.users.findOneAndUpdate({
                username: username
            }, {
                $set: {
                    "accessToken": accessToken
                }
            });

            res.status(200).send({ message: "Login successfully.", accessToken: accessToken });

            return;
        }

        res.status(404).send({ message: "Password is not correct." });
    });
};

exports.findAll = (req, res) => {
    db.users.find({}, "name username permissions")
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