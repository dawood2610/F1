const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// DB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Placeholder route
app.get("/", (req, res) => {
  res.send("F1 Race Tracker API");
});

const raceRoutes = require('./routes/raceRoutes');
app.use('/api/races', raceRoutes);


const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);


const teamRoutes = require('./routes/teamRoutes');
app.use('/api/teams', teamRoutes);


const driverRoutes = require('./routes/driverRoutes');
app.use('/api/drivers', driverRoutes);



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
