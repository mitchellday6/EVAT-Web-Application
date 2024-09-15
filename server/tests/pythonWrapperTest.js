const PyWrap = require('../scripts/pythonWrapper.js')();


PyWrap.callScript("../scripts/chargers_final.py", -31.93625, 115.871531, '')
    .then(data=>{
        console.log("Python Wrapper Test: get chargers");
        console.log(data);
    })