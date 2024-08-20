const express = require("express");
const router = express.Router();
/**
 * get details
 * set details {name, address, email, 
 * }
 * change password
 * reset password
 * 
 */

router.get('/', (req, res, next)=>{
    res.json({ message: 'Mapping API root' });
})

router.post('/', (req, res, next)=>{
    res.json({ message: 'Mapping API root' });
})

//used to convert voice to a text file
router.post('/voice-to-text', (req, res, next)=>{

    //functionality for converting a voice blob to text.
    res.json({ message: 'Convert voice to text' });
})

//used to find information from a sentence.
router.post('/search', (req, res, next)=>{
    res.json({ message: 'Mapping API root' });
})


module.exports = router;



