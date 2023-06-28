const db = require("../models");

function getData() {
  return new Promise((Resolve, reject) => {
    var shifts = db.shift.find({ status: 1 }).populate("employees");

    var incidents = db.incident.find().populate({
      path: 'status',
      match: {
        name: 'Open'
      }
    }).populate('type').populate({ path: 'vehicles', populate: { path: 'type' } }).populate({ path: 'shifts', populate: { path: 'employees', populate: { path: 'type' } } }).sort([['_id', -1]])

    var vehicles = db.vehicle.find().populate('type')

    Promise.all([shifts, incidents, vehicles]).then((returnedValues) => {
      const [shifts, incidents, vehicles] = returnedValues;

      var incidentsOpen = incidents.filter(function (i) {
        return i.status;
      });

      var employeesInShiftIn = [];
      var employeesInShiftOut = [];

      var vehiclesIn = [];
      var vehiclestOut = [];

      var shiftsAvailable = [];

      vehicles.forEach(vehicle => {
        var test = incidentsOpen.find(i => i.vehicles.some(item => String(item._id) == String(vehicle._id)));

        if (test != null) {
          vehiclesIn.push(vehicle);
        } else {
          vehiclestOut.push(vehicle);
        }
      })

      shifts.forEach(shift => {
        var test = incidentsOpen.find(i => i.shifts.some(item => String(item._id) == String(shift._id)));

        if (test == null) shiftsAvailable.push(shift);

        shift.employees.forEach(i => {
          if (test == null) {
            if (!employeesInShiftIn.includes(i) && !employeesInShiftOut.includes(i)) employeesInShiftIn.push(i);
          } else {
            if (!employeesInShiftIn.includes(i) && !employeesInShiftOut.includes(i)) employeesInShiftOut.push(i);
          }
        })
      });

      Resolve({
        employeesInShiftIn: employeesInShiftIn,
        employeesInShiftOut: employeesInShiftOut,
        vehiclesIn: vehiclesIn,
        vehiclestOut: vehiclestOut,
        incidents: incidentsOpen,
        shiftsAvailable: shiftsAvailable,
      })
    }).catch(error => {
      reject("Server error.")
    });
  })
}

module.exports = {
  getData: getData
};