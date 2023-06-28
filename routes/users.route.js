const { authJwt } = require("../middlewares");

module.exports = app => {
    const controller = require("../controllers/users.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", [authJwt.verifyToken, authJwt.isAdmin], controller.create);
    router.put("/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.update);
    router.get("/", [authJwt.verifyToken, authJwt.isAdmin], controller.findAll);
    router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.delete);

    app.use('/api/users', router);
  }; 