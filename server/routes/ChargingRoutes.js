const express = require('express');
const router = express.Router();

// GET all charging stations
router.get('/', (req, res) => {
    const stations = req.app.locals.stations; // Get the clustered stations from app.locals

    if (!stations) {
        return res.status(500).json({ error: 'Charging station data not available' });
    }

    res.json(stations); // Return all stations
});

// Filter stations by criteria (should be before ':id' route)
router.get('/filter', (req, res) => {
    const stations = req.app.locals.stations;

    if (!stations) {
        return res.status(500).json({ error: 'Charging station data not available' });
    }

    const { chargerType, minPower } = req.query;

    // Filter based on query parameters 
    const filteredStations = stations.filter(station => (
        (!chargerType || station.connection_type === chargerType) &&
        (!minPower || station.power_output >= parseFloat(minPower))
    ));

    res.json(filteredStations);
});

// GET a specific charging station by ID
router.get('/:id', (req, res) => {
    const stations = req.app.locals.stations;

    if (!stations) {
        return res.status(500).json({ error: 'Charging station data not available' });
    }

    const stationId = req.params.id;
    const station = stations.find(st => st._id.toString() === stationId); // Ensure _id is string

    if (!station) {
        return res.status(404).json({ error: 'Station not found' });
    }

    res.json(station); // Return the found station
});

module.exports = router;