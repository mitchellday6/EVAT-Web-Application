const GoogleAi = require("./scripts/googleAi");
const express = require("express");

//routers
const MapRoutes = require("./routes/MapRoutes");
const AuthRoutes = require("./routes/AuthRoutes");
const ConfigRoutes = require("./routes/ConfigRoutes");
// Middleware to parse JSON bodies
app.use(express.json());

app.use('/auth', AuthRoutes);
app.use('/api/mapping', MapRoutes);
app.use('/api/config', ConfigRoutes);

//interface for reactjs static files
app.get('/', (req, res) => {
    res.send('hello world')
})
  

app.listen(3000)


let ai = GoogleAi();

ai.fromPrompt("Number of bus stops from location: -27.493017, 153.077346");