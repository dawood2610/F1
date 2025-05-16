// server/models/Race.js
const mongoose = require('mongoose');

const raceSchema = new mongoose.Schema({
  name: String,
  location: String,
  date: Date,
  teams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }],
  drivers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Driver' }]
}, { timestamps: true });

module.exports = mongoose.model('Race', raceSchema);
