const express = require("express");
const router = express.Router();
const EVAT_AI = require("../scripts/evat_ai");
const PyWrap = require('../scripts/pythonWrapper.js')();
const LocalJSON = require('../scripts/localJson.js');
const path = require("path");

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


// gets service/s using the origin and destination of trip
router.get('/getservice', async (req, res, next) => {
    const { origin, destination } = req.query;
    const response = await ai.fromPrompt(req.query.prompt);
    res.json({ message: 'Navigation: get services', data: response });
})

//gets service/s using the origin and destination of trip
router.get('/getchargers', async (req, res, next) => {

    // const getChargersUrl = path.resolve(__dirname, '..', 'scripts','python','getnearestcharger.py')
    const { lat, lon, chargerType } = req.query;
    
    // //load local JSON for API testing
    let result = await LocalJSON.load("./tests/testData/testData.json");
    if(result.error) return result;

    // // functionality to get charging stations from python script
    // let data = await PyWrap.callScript(getChargersUrl, lat, lon); 

    res.json({ message: 'Navigation: get nearest chargers', data: result.data });
})



router.post('/', (req, res, next) => {
    res.json({ message: 'Map API root' });
})



module.exports = router;



