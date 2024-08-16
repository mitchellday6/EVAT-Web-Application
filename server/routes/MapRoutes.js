const express = require("express");
const router = express.Router();
const GoogleAi = require("../scripts/googleAi");

ai = GoogleAi();


router.get('/', async (req, res, next)=>{
    if(!req.query.prompt){
        res.json({ error: true, message: '/API/MAPPING: No Prompt present' });
        return;
    } else {
        const response = await ai.fromPrompt(req.query.prompt);
        res.json({ message: 'Mapping API root', data: response });
    }
    
})

router.post('/', (req, res, next)=>{
    res.json({ message: 'Mapping API root' });
})


module.exports = router;



