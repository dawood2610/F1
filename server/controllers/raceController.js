const Race = require('../models/Race');

exports.getRaces = async (req, res) => {
  try {
    const races = await Race.find()
      .sort({ date: 1 })
      .populate('teams')
      .populate({
        path: 'drivers',
        populate: { path: 'team' }
      });

    res.json(races);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createRace = async (req, res) => {
  const { name, location, date, teams, drivers } = req.body;

  console.log("Received race:", { name, location, date, teams, drivers });

  try {
    const newRace = new Race({ name, location, date, teams, drivers });
    await newRace.save();
    res.status(201).json({ success: true, data: newRace });
  } catch (err) {
    console.error("Error creating race:", err);
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.getRaceById = async (req, res) => {
  try {
    const race = await Race.findById(req.params.id)
      .populate('teams')
      .populate({
        path: 'drivers',
        populate: { path: 'team' }
      });

    if (!race) return res.status(404).json({ message: 'Race not found' });

    res.json(race);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteRace = async (req, res) => {
  try {
    const deleted = await Race.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Race not found" });
    }
    res.status(200).json({ message: "Race deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};