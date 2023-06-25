const { authJwt } = require("../middlewares");

module.exports = app => {
    const controller = require("../controllers/users.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", [authJwt.verifyToken], controller.create);
    router.put("/:id", [authJwt.verifyToken], controller.update);
    router.get("/", [authJwt.verifyToken], controller.findAll);
    router.delete("/:id", [authJwt.verifyToken], controller.delete);

    app.use('/api/users', router);
  }; 