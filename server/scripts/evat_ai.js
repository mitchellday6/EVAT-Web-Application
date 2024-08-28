// Import necessary libraries
const { GoogleAuth } = require('@google/generative-ai');
const { Client } = require("@googlemaps/google-maps-services-js");
const speech = require('@google-cloud/speech');

// Initialize Google AI clients
const mapsClient = new Client({});
const speechClient = new speech.SpeechClient();
const generativeAiClient = new GoogleAuth();

const AIFactory = () => {
  const apiKey = 'YOUR_GOOGLE_MAPS_API_KEY';
  const aiKey = 'YOUR_GOOGLE_AI_API_KEY';
  
  /**
   * Extract locations from a natural language sentence.
   * @param {string} sentence - The sentence to extract locations from.
   * @returns {Object} An object containing the start and destination locations.
   * @description This function uses Google Generative AI to extract locations and route information from a sentence.
   */
  const extractLocations = async (sentence) => {
    const prompt = `Extract locations and route-related information from the following sentence: "${sentence}"`;
    const aiResponse = await generativeAiClient.generateText({
      model: 'text-bison-001',
      prompt,
      temperature: 0.7,
    });

    const responseText = aiResponse.data.choices[0].text;
    const locations = responseText.match(/(?:from\s)(\w+)(?:\sto\s)(\w+)/i);
    
    return {
      start: locations[1],
      destination: locations[2],
    };
  };

  /**
   * Create a route using Google Maps API from a natural language sentence.
   * @param {string} sentence - The sentence describing the route (e.g., "Plan a trip from Sydney to Melbourne").
   * @returns {Object} An object containing the start, destination, and the route details.
   * @description This function generates a driving route based on the input sentence using the Google Maps Directions API.
   */
  const createRouteFromSentence = async (sentence) => {
    const locations = await extractLocations(sentence);
    
    const route = await mapsClient.directions({
      params: {
        origin: locations.start,
        destination: locations.destination,
        key: apiKey,
      },
    });

    return {
      start: locations.start,
      destination: locations.destination,
      route: route.data.routes[0].legs[0].steps.map(step => step.html_instructions),
    };
  };

  /**
   * Find nearby places using Google Places API.
   * @param {Object} location - An object containing latitude and longitude (e.g., { lat: -33.8675, lon: 151.2070 }).
   * @param {string} placeType - Type of place to search for (e.g., "restaurant", "park").
   * @param {number} [distance=5000] - Distance radius in meters to search for places.
   * @returns {Array} An array of nearby places with their names and distances.
   * @description This function uses the Google Places API to find nearby places within a certain radius.
   */
  const findPlacesNearby = async (location, placeType, distance = 5000) => {
    const nearbyPlaces = await mapsClient.placesNearby({
      params: {
        location: location,
        radius: distance,
        type: placeType,
        key: apiKey,
      },
    });

    return nearbyPlaces.data.results.map(place => ({
      name: place.name,
      distance: place.vicinity,
    }));
  };

  /**
   * Find nearby EV chargers using Google Places API.
   * @param {Object} location - An object containing latitude and longitude (e.g., { lat: -33.8675, lon: 151.2070 }).
   * @param {number} [distance=5000] - Distance radius in meters to search for EV chargers.
   * @returns {Array} An array of nearby EV chargers with their names and distances.
   * @description This function uses the Google Places API to find nearby EV chargers within a certain radius.
   */
  const getEVChargers = async (location, distance = 5000) => {
    const evChargers = await mapsClient.placesNearby({
      params: {
        location: location,
        radius: distance,
        type: 'charging_station',
        key: apiKey,
      },
    });

    return evChargers.data.results.map(charger => ({
      name: charger.name,
      distance: charger.vicinity,
    }));
  };

  /**
   * Convert voice input to text using Google Speech-to-Text API.
   * @param {Buffer} audioBuffer - Audio data received from the client (Express endpoint).
   * @returns {string} Transcribed text from the audio.
   * @description This function converts audio blob data received from an Express endpoint into text.
   */
  const vtt = async (audioBuffer) => {
    const audio = {
      content: audioBuffer.toString('base64'), // Pass audio blob directly as a buffer
    };

    const request = {
      audio,
      config: {
        encoding: 'LINEAR16',
        sampleRateHertz: 16000,
        languageCode: 'en-US',
      },
    };

    const [response] = await speechClient.recognize(request);
    const transcription = response.results.map(result => result.alternatives[0].transcript).join('\n');
    return transcription;
  };

  /**
   * Process voice input and delegate it to the appropriate function.
   * @param {string} voiceText - Transcribed text to process.
   * @returns {Object|string} The response based on the voice command (e.g., route, nearby places, EV chargers).
   * @description This function takes transcribed voice input and processes it to determine which task to perform.
   */
  const processVoiceInput = async (voiceText) => {
    console.log(`Received voice input: ${voiceText}`);
    
    if (voiceText.includes("route")) {
      return await createRouteFromSentence(voiceText);
    } else if (voiceText.includes("restaurant")) {
      return await findPlacesNearby("current location", "restaurant");
    } else if (voiceText.includes("charger")) {
      return await getEVChargers("current location");
    } else {
      return "Sorry, I didn't understand the request.";
    }
  };

  return {
    createRouteFromSentence,
    findPlacesNearby,
    getEVChargers,
    vtt,
    processVoiceInput,
  };
};

// Example usage (you would need actual coordinates and audio files for this to work in practice)
// const ai = AIFactory();

// Simulate route creation from a sentence
// ai.createRouteFromSentence("Plan a trip from Sydney to Melbourne").then(console.log);

// Simulate finding nearby places with default distance
// ai.findPlacesNearby({ lat: -33.8675, lon: 151.2070 }, "restaurant").then(console.log);

// Simulate finding nearby places with custom distance
// ai.findPlacesNearby({ lat: -33.8675, lon: 151.2070 }, "restaurant", 3000).then(console.log);

// Simulate getting EV chargers
// ai.getEVChargers({ lat: -33.8675, lon: 151.2070 }).then(console.log);

// Simulate voice-to-text translation (replace 'audioBuffer' with the audio blob data received from Express)
// const audioBuffer = Buffer.from(''); // This would be replaced with actual audio blob data
// ai.vtt(audioBuffer).then(transcription => {
//   console.log("Transcription: ", transcription);
//   ai.processVoiceInput(transcription).then(console.log);
// });
