

module.exports = app => {
    const controller = require("../controllers/display_data.controller.js");
  
    var router = require("express").Router();
  
    router.get("/incidents", controller.getIncidents);
  
    app.use('/api/display', router);
  };  