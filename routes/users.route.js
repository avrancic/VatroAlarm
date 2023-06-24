module.exports = app => {
    const controller = require("../controllers/users.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", controller.create);
    router.put("/:id", controller.update);
    router.get("/", controller.findAll);
    router.post("/login", controller.login);
    router.delete("/:id", controller.delete);

    app.use('/api/users', router);
  }; 