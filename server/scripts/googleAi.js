const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config()
console.log(process.env.GOOGLE_API_KEY2)
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });



function GoogleAi(){

    async function generateOutput(input){
        //return error if no content, or empty array
        if (!input || input.length == 0) {
            return { error: true, message: "no input passed to AI Model"}
        }
    
        if(input == typeof Array){
            
        }

        const result = await model.generateContent(input);
        console.log(JSON.stringify(result));
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