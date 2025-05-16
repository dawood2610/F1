// server/models/Driver.js
const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
  name: { type: String, required: true },
  team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Driver', driverSchema);
