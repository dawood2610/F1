const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
  name: String,
  team: String,
});

const raceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: String,
  date: { type: Date, required: true },
  drivers: [driverSchema], 
});

module.exports = mongoose.model('Race', raceSchema);
