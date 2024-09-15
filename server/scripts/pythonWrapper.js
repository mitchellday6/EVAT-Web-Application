
const spawn = require("child_process").spawn;


function Python(){
    let pyProcess = null;
    

    async function callScript(scriptName, arg1, arg2, arg3){
        let result = '';
        console.log("Call Script: ")
        console.log(scriptName)
        console.log(arg1 +" "+ arg2)
        return new Promise((resolve, reject)=>{
            pyProcess = spawn('python',[scriptName, arg1, arg2]);
            pyProcess.stdout.on(`data` , (data) => {
                result += data.toString();
                console.log("New Data")
            });
        
            pyProcess.on('close' , function(code) {
                console.log("Py Process Closed. Data:")
                console.log(result);
                resolve(result)
            });
            pyProcess.on('error' , function(err){
                console.log("Error on python script:");
                console.log(err);
                reject(err)
            });
        })
        

    }

    return {
        callScript,
    }
}

module.exports = Python;