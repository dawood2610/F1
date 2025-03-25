// server/seed.js
const mongoose = require('mongoose');
require('dotenv').config();
const Race = require('./models/Race');

mongoose.connect(process.env.MONGO_URI).then(async () => {
  await Race.deleteMany();
  await Race.insertMany([
    { name: 'Monaco Grand Prix', location: 'Monte Carlo', date: '2025-05-26' },
    { name: 'British Grand Prix', location: 'Silverstone', date: '2025-07-07' },
  ]);
  console.log("Sample races added!");
  process.exit();
});
