const express = require("express");
const router = express.Router();
const GoogleAi = require("../scripts/googleAi");

ai = GoogleAi();


router.get('/', async (req, res, next) => {
    if (!req.query.prompt) {
        res.json({ error: true, message: '/api/navigation: No Prompt present' });
        return;
    } else {
        const response = await ai.fromPrompt(req.query.prompt);
        res.json({ message: 'Navigation API root', data: response });
    }

})

//gets service/s using the origin and destination of trip
router.get('/getservice', async (req, res, next) => {
    const { origin, destination } = req.query;
    const response = await ai.fromPrompt(req.query.prompt);
    res.json({ message: 'Navigation: get services', data: response });
})

router.post('/', (req, res, next) => {
    res.json({ message: 'Map API root' });
})


module.exports = router;



