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
      return res.status(400).send({ message: "Cannot be createed!" });
    })
};

exports.findAll = (req, res) => {
  const vehicles = db.vehicle.find().populate('type')
  const vehicleTypes = db.vehicle_Type.find()

  Promise.all([vehicles, vehicleTypes]).then((returnedValues) => {
    const [vehiclesResult, vehicleTypesResult] = returnedValues;

    return res.status(200).send({
      vehicles: vehiclesResult,
      vehicleTypes: vehicleTypesResult
    })
  }).catch((error) => {
    return res.status(500).json({ message: "Server error!" });
  });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Data to update can not be empty!" });
  }

  const id = req.params.id;

  db.vehicle.findByIdAndUpdate(id, req.body, { useFindAndModify: false, runValidators: true })
    .then(data => {
      if (!data) {
        return res.status(404).send({message: `Vehicle not found!`});
      } else return res.status(200).send({message: `Vehicle updated!`});
    })
    .catch(err => {
      return res.status(500).send({ message: "Server error!" });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  db.incident.findOne({ vehicles: id }).then(data => {
    if (!data) {
      db.vehicle.findByIdAndRemove(id)
        .then(data => {
          if (!data) {
            return res.status(404).send({message: `Vehicle not found!`});
          } else {
            return res.status(200).send({message: `Vehicle deleted!`});
          }
        })
        .catch(() => {
          return res.status(500).send({ message: "Server error!" });
        });
    } else {
      return res.status(400).send({ message: "Cannot delete vehicle because exists in incidets!" });
    }
  })
    .catch(() => {
      return res.status(500).send({ message: "Server error!" });
    });
};