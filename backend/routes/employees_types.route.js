module.exports = app => {
  const controller = require("../controllers/employees_types.controller.js");

  var router = require("express").Router();

  router.post("/", controller.create);
  router.get("/", controller.findAll);
  router.put("/:id", controller.update);
  router.delete("/:id", controller.delete);

  app.use('/api/employees_types', router);
};