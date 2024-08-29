require('dotenv').config()
const EVAT_AI = require("../scripts/evat_ai");
const multer = require("multer");
const fs = require('fs');
const path = require('path');

// Example usage (you would need actual coordinates and audio files for this to work in practice)
const ai = EVAT_AI();

// Simulate route creation from a sentence
ai.createRouteFromSentence("Plan a trip from Sydney to Melbourne and with two stops for charging").then(console.log);

// Simulate finding nearby places with default distance
// ai.findPlacesNearby({ lat: -33.8675, lon: 151.2070 }, "restaurant").then(console.log);

// Simulate finding nearby places with custom distance
// ai.findPlacesNearby({ lat: -33.8675, lon: 151.2070 }, "restaurant", 3000).then(console.log);

// Simulate getting EV chargers
// ai.getEVChargers({ lat: -33.8675, lon: 151.2070 }).then(console.log);


// Test function to run locally
async function testVoiceToText() {
  try {
    // Read the audio file into a buffer
    const audioFilePath = path.join(__dirname, './testData/normanpark_ev.m4a'); // Replace with your actual audio file path
    const audioBuffer = fs.readFileSync(audioFilePath);

    // Call the vtt function to transcribe the audio file
    const transcription = await ai.vtt(audioBuffer);

    // Print the transcription
    console.log('Transcription:', transcription);

    // Optionally process the transcription using the processVoiceInput function
    const processedResponse = await ai.processVoiceInput(transcription);
    console.log('Processed Response:', processedResponse);
  } catch (error) {
    console.error('Error processing audio file:', error);
  }
}

// Run the test
// testVoiceToText();