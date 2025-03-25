// server/routes/raceRoutes.js
const express = require('express');
const router = express.Router();
const raceController = require('../controllers/raceController');

router.get('/getraces', raceController.getRaces);
router.post('/postraces', raceController.createRace);
router.get('/:id', raceController.getRaceById);

module.exports = router;
