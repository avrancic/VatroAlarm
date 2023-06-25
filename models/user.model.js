const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require('../config/auth.config');

module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      name: {
        type: String,
        minlength: 1,
        required: true
      },
      username: {
        type: String,
        minlength: 1,
        required: true
      },
      password: {
        type: String,
        required: true
      },
      role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserRole"
      },
      tokens: [
        {
          token: {
            type: String,
            required: true
          }
        }
      ]
    }
  );

  schema.pre("save", function (next) {
    const user = this;

    if (user.isModified("password")) {
      bcrypt.hash(user.password, 8).then(hash => {
        user.password = hash;
      })
      .catch(err => {
        next();
      })
    } else {
      next();
    }
  });

  schema.methods.generateAuthToken = function () {
    const user = this;

    return new Promise((resolve, reject) => {
      const token = jwt.sign({ _id: user._id, name: user.name, username: user.username, role: user.role }, config.secret);

      user.tokens = user.tokens.concat({ token });

      user.save().then(() => {
        resolve(token)
      }).catch(err => {
        return reject(err);
      })
    })
  };

  schema.statics.findByCredentials = function (username, password) {
    return new Promise((resolve, reject) => {
      User.findOne({ username: username }).populate('role').then(user => {
        if (!user) {
          return reject("Invalid login details");
        }

        bcrypt.compare(password, user.password).then(isPasswordMatch => {
          if (!isPasswordMatch) {
            return reject("Invalid login details");
          }

          resolve(user)
        });
      }).catch(err => {
        return reject(err);
      })
    })
  };

  const User = mongoose.model("User", schema);

  return User;
};