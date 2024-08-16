//this module handles all backend routes for the vehicle API
const express = require("express");
const router = express.Router();


router.get('/', (req, res, next)=>{
    res.json({ message: 'Mapping API root' });
})

//add vehicle to list
router.post('/add', (req, res, next)=>{
    //create functionality for adding a vehicle
    res.json({ message: 'Mapping API root' });
})

//get list of vehicles
router.get('/getall', (req, res, next)=>{
    //create functionality for getting vehicle list
    res.json({ message: 'Mapping API root' });
})

//gets list of vehicles that match
router.get('/getbyfeature', (req, res, next)=>{
    //create functionality for getting vehicle list by features
    
    res.json({ message: 'Mapping API root' });
})


module.exports = router;
