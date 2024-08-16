const { GoogleGenerativeAI } = require("@google/generative-ai");
const { Client } = require("@googlemaps/google-maps-services-js");


gMapsClient = new Client({})
//uncomment to check key issues
console.log("Check AI Key", process.env.GOOGLE_API_KEY);
// console.log(process.env);

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY2);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });



function GoogleAi() {
    function fetchEVChargers() {

        gMapsClient
            .elevation({
                params: {
                    locations: [{ lat: 45, lng: -110 }],
                    key: process.env.GOOGLE_API_KEY,
                },
                timeout: 1000, // milliseconds
            })
            .then((r) => {
                console.log(r.data.results[0].elevation);
            })
            .catch((e) => {
                console.log(e.response.data.error_message);
            });
    }
    
    async function findItemsAroundPoint(type, location, radius) {
        try {
          const response = await client.placesNearby({
            params: {
              location, // Replace with your desired location (latitude, longitude)
              radius, // Search radius in meters
              type: itemType, // Places type for EV chargers
              key: process.env.GOOGLE_API_KEY // Replace with your API key
            }
          });
      
          const evChargers = response.data.results;
          console.log("EV Chargers found:", evChargers);
        } catch (error) {
          console.error("Error fetching EV chargers:", error);
        }
      }


    async function generateOutput(input) {
        //return error if no content, or empty array
        let result;
        if (!input || input.length == 0) {
            return { error: true, message: "no input passed to AI Model" }
        }
        try {
            result = await model.generateContent(input);
            console.log(result)
            return response = result.response
        } catch (error) {
            console.log("AI Generate content error:")
            console.log(JSON.stringify(error))
            return error;
        }
        
    }



    async function fromPrompt(prompt) {
        //check prompt is not null
        if (!prompt) { return { error: true, message: "No prompt was given" } };

        return await generateOutput(prompt);
    }

    return {
        fromPrompt

    }
}


module.exports = GoogleAi