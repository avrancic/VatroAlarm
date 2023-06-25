const { authJwt } = require("../middlewares");

module.exports = app => {
  const controller = require("../controllers/shifts.controller.js");

  var router = require("express").Router();

  router.post("/", [authJwt.verifyToken], controller.create);
  router.get("/", [authJwt.verifyToken], controller.findAll);
  router.put("/:id", [authJwt.verifyToken], controller.update);
  router.delete("/:id", [authJwt.verifyToken], controller.delete);

  app.use('/api/shifts', router);
};  