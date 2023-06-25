const db = require("../models");

exports.create = (req, res) => {
  new db.vehicle({
    number: req.body.number,
    plate: req.body.plate,
    model: req.body.model,
    type: req.body.type
  }).save()
    .then(() => {
      return res.status(200).send({ message: "Created!" });
    })
    .catch(err => {
      return res.status(500).send({ message: "Cannot be createed!" });
    })
};

exports.findAll = (req, res) => {
  const vehicles = db.vehicle.find().populate('type')
  const vehicleTypes = db.vehicle_Type.find()

  Promise.all([vehicles, vehicleTypes]).then((returnedValues) => {
    const [vehiclesResult, vehicleTypesResult] = returnedValues;

    if (vehiclesResult == null || vehicleTypesResult == null) {
      return res.status(500).send({ message: "Error." });
    }

    return res.status(200).send({
      vehicles: vehiclesResult,
      vehicleTypes: vehicleTypesResult
    })
  }).catch((error) => {
    console.log(error)
  });
};

exports.update = (req, res) => {
  const id = req.params.id;

  db.vehicle.findByIdAndUpdate(id, req.body, { useFindAndModify: false, runValidators: true })
    .then(data => {
      if (!data) {
        return res.status(404).send({
          message: `Cannot update vehicle with id=${id}.`
        });
      } else res.send({ message: "Vehicle updated successfully." });
    })
    .catch(err => {
      return res.status(500).send({
        message: "Error updating vehicles with id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  db.incident.findOne({ vehicles: id }).then(data => {
    if (!data) {
      db.vehicle.findByIdAndRemove(id)
        .then(data => {
          if (!data) {
            return res.status(404).send({ message: "Cannot delete." });
          } else {
            return res.send({ message: "Deleted successfully!" });
          }
        })
        .catch(() => {
          return res.status(500).send({ message: "Cannot delete" });
        });
    } else {
      return res.status(500).send({ message: "Cannot delete because is used somewhere." });
    }
  })
    .catch(() => {
      return res.status(500).send({ message: "Cannot delete" });
    });
};