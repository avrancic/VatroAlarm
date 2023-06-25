const { authJwt } = require("../middlewares");

module.exports = app => {
    const controller = require("../controllers/display_data.controller.js");
  
    var router = require("express").Router();
  
    router.get("/incidents", [authJwt.verifyToken], controller.getIncidents);
  
    app.use('/api/display', router);
  };  