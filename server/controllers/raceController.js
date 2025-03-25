// server/controllers/raceController.js
const Race = require('../models/Race');

exports.getRaces = async (req, res) => {
  try {
    const races = await Race.find().sort({ date: 1 });
    res.json(races);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createRace = async (req, res) => {
  const { name, location, date, drivers } = req.body;

  // ✅ Add this console log
  console.log("Received race:", { name, location, date, drivers });

  try {
    const newRace = new Race({ name, location, date, drivers });
    await newRace.save();
    res.status(201).json(newRace);
  } catch (err) {
    console.error("Error creating race:", err);
    res.status(400).json({ message: err.message });
  }
};


exports.getRaceById = async (req, res) => {
  try {
    const race = await Race.findById(req.params.id);
    if (!race) return res.status(404).json({ message: 'Race not found' });
    res.json(race);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
