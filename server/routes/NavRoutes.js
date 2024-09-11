const express = require("express");
const router = express.Router();
const EVAT_AI = require("../scripts/evat_ai");

const ai = EVAT_AI();


router.get('/', async (req, res, next) => {
    if (!req.query.prompt) {
        res.json({ error: true, message: '/api/navigation: No Prompt present' });
        return;
    } else {
        const response = await ai.fromPrompt(req.query.prompt);
        res.json({ message: 'Navigation API root', data: response });
    }
})

//used to convert voice to a text file
router.post('/vtt', (req, res, next)=>{
    const data = "";
    //functionality for converting a voice blob to text.
    res.json({ message: 'Convert voice to text', data});
})

//gets service/s using the origin and destination of trip
// router.get('/getservice', async (req, res, next) => {
//     const { origin, destination } = req.query;
//     const response = await ai.fromPrompt(req.query.prompt);
//     res.json({ message: 'Navigation: get services', data: response });
// })

//gets service/s using the origin and destination of trip
router.get('/getchargers', async (req, res, next) => {
    const { lat, lon, chargerType } = req.query;
    const fakeData = [{lat: lat+0.01, lon: lon+0.002, chargerType }]
    res.json({ message: 'Navigation: get services', data: fakeData });
})

router.post('/', (req, res, next) => {
    res.json({ message: 'Map API root' });
})



module.exports = router;



