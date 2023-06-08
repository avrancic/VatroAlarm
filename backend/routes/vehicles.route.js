module.exports = app => {
    const vehicles = require("../controllers/vehicles.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", vehicles.create);
  
    // Retrieve all Tutorials
    router.get("/", vehicles.findAll);
    
    // Retrieve a single Tutorial with id
    router.get("/:id", vehicles.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", vehicles.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", vehicles.delete);
  
    // Delete all Tutorials
    router.delete("/", vehicles.deleteAll);
  
    app.use('/api/vehicles', router);
  };  