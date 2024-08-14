const express = require("express");
const router = express.Router();
const GoogleAi = require("../scripts/googleAi");

ai = GoogleAi();


router.get('/', (req, res, next)=>{
    res.json({ message: 'Mapping API root' });
})

router.post('/', (req, res, next)=>{
    res.json({ message: 'Mapping API root' });
})


module.exports = router;



