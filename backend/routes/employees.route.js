module.exports = app => {
  const controller = require("../controllers/employees.controller.js");

  var router = require("express").Router();

  router.post("/", controller.create);
  router.get("/", controller.findAll);
  router.get("/:id", controller.findOne);
  router.put("/:id", controller.update);
  router.delete("/:id", controller.delete);
  router.delete("/", controller.deleteAll);

  app.use('/api/employees', router);
};  