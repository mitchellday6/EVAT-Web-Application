const { GoogleGenerativeAI } = require("@google/generative-ai");
const {Client} = require("@googlemaps/google-maps-services-js");
require('dotenv').config()

gMapsClient = new Client({})
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });



function GoogleAi(){

    gMapsClient.
    
    function fetchEVChargers(){}
    
    
    
    
    async function generateOutput(input){
        //return error if no content, or empty array
        if (!input || input.length == 0) {
            return { error: true, message: "no input passed to AI Model"}
        }
        const result = await model.generateContent(input);
        return response = result.response
    }



    async function fromPrompt(prompt){
        //check prompt is not null
        if(!prompt) {return {error: true, message: "No prompt was given"}};

        return await generateOutput(prompt);
    }

    return {
        fromPrompt

    }
}


module.exports = GoogleAi