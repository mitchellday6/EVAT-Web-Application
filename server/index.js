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

//mongodb connection
const MongoDB = require('./db/mongoDB');

const mongoDB = new MongoDB();

// Connect to MongoDB when the server starts
mongoDB.connect()
    .then(() => console.log('MongoDB connected successfully'))
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Exit if the database connection fails
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