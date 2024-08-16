//get all system environment variables
require('dotenv').config()
const path = require("path");
const express = require("express");
const app = express();

//routers
const MapRoutes = require("./routes/MapRoutes");
const VehicleRoutes = require("./routes/VehicleRoutes");
const UserRoutes = require("./routes/UserRoutes");
const ConfigRoutes = require("./routes/ConfigRoutes");

//global vars
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

//all API endpoints
app.use('/user', UserRoutes);
app.use('/api/config', ConfigRoutes);
app.use('/api/vehicle', VehicleRoutes);
app.use('/api/mapping', MapRoutes);


app.use(express.static('client/build'));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});


app.listen(webPort, () => {
    console.log("Server Listening on port: " + webPort);
})