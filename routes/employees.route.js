const { authJwt } = require("../middlewares");

module.exports = app => {
  const controller = require("../controllers/employees.controller.js");

  var router = require("express").Router();

  router.post("/", [authJwt.verifyToken, authJwt.isAdmin], controller.create);
  router.get("/", [authJwt.verifyToken, authJwt.isAdmin], controller.findAll);
  router.put("/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.update);
  router.delete("/:id",[authJwt.verifyToken, authJwt.isAdmin], controller.delete);

  app.use('/api/employees', router);
};  