module.exports = app => {
    const controller = require("../controllers/users.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", controller.create);
    router.get("/", controller.findAll);
    router.post("/login", controller.login);
  
    app.use('/api/users', router);
  }; 