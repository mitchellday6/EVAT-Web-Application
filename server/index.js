//get all system environment variables
require('dotenv').config()
const path = require("path");
const express = require("express");
const app = express();

//routers
const NavRoutes = require("./routes/NavRoutes");
const VehicleRoutes = require("./routes/VehicleRoutes");
const UserRoutes = require("./routes/UserRoutes");
const ConfigRoutes = require("./routes/ConfigRoutes");
const ChargingRoutes = require('./routes/ChargingRoutes');

//services
const chargingService = require('./services/chargingService');

//mongodb connection
const MongoDB = require('./db/mongoDB');

const mongoDB = new MongoDB();

// Connect to MongoDB when the server starts
mongoDB.connect()
    .then(() => {
        console.log('MongoDB connected successfully');

        // Retrieve charging stations after connection is successful
        return mongoDB.getChargingStations();
    })
    .then(stations => {
        console.log('Charging stations retrieved:', stations.length);

        // Process the stations data for clustering
        const { clusteredStations, clusterCenters } = chargingService.clusterStations(stations);

        console.log('Stations clustered:', clusteredStations.length);

        console.log('Cluster centers:', clusterCenters);

        // Store the processed data in app.locals for use in routes
        app.locals.stations = clusteredStations;

        // Set up the routes after the stations are ready
        app.use('/api/charging', ChargingRoutes); // Use the charging routes
    })
    .catch(error => {
        console.error('Error initializing the app:', error);
        process.exit(1); // Exit if there's any error
    });

//global vars
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

//all API endpoints
app.use('/user', UserRoutes);
app.use('/api/config', ConfigRoutes);
app.use('/api/vehicle', VehicleRoutes);
app.use('/api/navigation', NavRoutes);


app.use(express.static('client/build'));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

process.on('SIGINT', async () => {
    await mongoDB.close();
    process.exit(0);
});

app.listen(PORT, () => {
    console.log("Server Listening on port: " + PORT);
})