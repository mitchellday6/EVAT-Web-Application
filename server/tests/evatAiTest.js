const GoogleAi = require("../scripts/evat_ai");

// Example usage (you would need actual coordinates and audio files for this to work in practice)
const ai = AIFactory();

// Simulate route creation from a sentence
ai.createRouteFromSentence("Plan a trip from Sydney to Melbourne").then(console.log);

// Simulate finding nearby places with default distance
ai.findPlacesNearby({ lat: -33.8675, lon: 151.2070 }, "restaurant").then(console.log);

// Simulate finding nearby places with custom distance
ai.findPlacesNearby({ lat: -33.8675, lon: 151.2070 }, "restaurant", 3000).then(console.log);

// Simulate getting EV chargers
ai.getEVChargers({ lat: -33.8675, lon: 151.2070 }).then(console.log);

// Simulate voice-to-text translation (replace 'audioBuffer' with the audio blob data received from Express)
const audioBuffer = Buffer.from(''); // This would be replaced with actual audio blob data
ai.vtt(audioBuffer).then(transcription => {
  console.log("Transcription: ", transcription);
  ai.processVoiceInput(transcription).then(console.log);
});
