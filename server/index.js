//get all system environment variables
require('dotenv').config()

const GoogleAi = require("./scripts/googleAi");
const express = require("express");
const app = express();


// console.log("Indexjs Process object:");
// console.log(process.env);

//routers
const MapRoutes = require("./routes/MapRoutes");
const VehicleRoutes = require("./routes/VehicleRoutes");
const UserRoutes = require("./routes/UserRoutes");
const ConfigRoutes = require("./routes/ConfigRoutes");

//global vars
const webPort = 3000;
// Middleware to parse JSON bodies
app.use(express.json());

app.use('/user', UserRoutes);
app.use('/api/config', ConfigRoutes);
app.use('/api/vehicle', VehicleRoutes);
app.use('/api/mapping', MapRoutes);

//interface for reactjs static files
app.get('/', (req, res) => {
    res.send('hello world')
})
  

app.listen(webPort,()=>{
    console.log("Server Listening on port: "+webPort);
})



let ai = GoogleAi();

ai.fromPrompt("Number of bus stops from location: -27.493017, 153.077346");