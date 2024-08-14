//this module handles all backend routes for the vehicle API
const express = require("express");
const router = express.Router();


router.get('/', (req, res, next)=>{
    res.json({ message: 'Mapping API root' });
})

router.post('/', (req, res, next)=>{
    res.json({ message: 'Mapping API root' });
})


module.exports = router;
