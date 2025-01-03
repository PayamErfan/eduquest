// export const WordAudio = async (text) => {
//     const apiKey = process.env.REACT_APP_LMNT_API_KEY; // Add your API key to the .env file
  
//     if (!apiKey) {
//       console.error("API key is missing. Please set REACT_APP_LMNT_API_KEY in your .env file.");
//       return;
//     }
  
//     // Ensure the text is not empty
//     if (!text || text.trim() === "") {
//       console.error("Text is required for speech synthesis.");
//       return;
//     }
  
//     try {
//       const response = await fetch('https://api.lmnt.ai/v1/synthesize', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${apiKey}`,
//         },
//         body: JSON.stringify({
//           text,
//           voice: 'lily', // Adjust the voice name if needed
//         }),
//       });
  
//       if (!response.ok) {
//         throw new Error(`API request failed with status ${response.status}`);
//       }
  
//       const audioData = await response.arrayBuffer(); // Get the audio data
//       return new Blob([audioData], { type: 'audio/mp3' }); // Return audio as a Blob
//     } catch (error) {
//       console.error('Error synthesizing audio:', error.message || error);
//       return null;
//     }
//   };
  

// //import Speech from 'lmnt-node';


// // // const lmnt = require('lmnt-node');
// // // const fs = require('fs');

// // // export const lmntMyTester = async () => {
// // //   const speech = new lmnt.Speech();
// // //   const synthesis = await speech.synthesize('Hello world.', 'lily');
// // //   //fs.writeFileSync('hello.mp3', synthesis.audio);
// // // };


// // export const WordAudio = async (word) => {
// //     try {
// //       console.log('Attempting to generate audio for:', word);
  
// //       // Ensure the API key is available
// //       const apiKey = process.env.REACT_APP_LMNT_API_KEY;
// //       if (!apiKey) {
// //         throw new Error("REACT_APP_LMNT_API_KEY not found. Please set it in your .env file.");
// //       }
  
// //       // Initialize speech synthesis
// //       const speech = new Speech(apiKey);
  
// //       // Convert the word to spoken text if necessary
// //       const word = `The word is ${word}`; // Customize as needed
  
// //       console.log("Pre-synthesis");
      
// //       // Synthesize speech
// //       const synthesis = await speech.synthesize(spokenText, 'lily'); // Adjust voice as needed
// //       console.log("Post-synthesis");
  
// //       return synthesis;
// //     } catch (error) {
// //       console.error('Error generating audio:', error.message || error);
// //       return null;
// //     }
// //   };
// import { useState } from 'react';

// export const WordAudio = async (text) => {
//   const apiKey = process.env.REACT_APP_LMNT_API_KEY; // Add your API key to the .env file

//   if (!apiKey) {
//     console.error("API key is missing. Please set REACT_APP_LMNT_API_KEY in your .env file.");
//     return;
//   }

//   try {
//     const response = await fetch('https://api.lmnt.ai/v1/synthesize', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${apiKey}`,
//       },
//       body: JSON.stringify({
//         text,
//         voice: 'lily', // Adjust the voice name if needed
//       }),
//     });

//     if (!response.ok) {
//       throw new Error(`API request failed with status ${response.status}`);
//     }

//     const audioData = await response.arrayBuffer(); // Get the audio data
//     return new Blob([audioData], { type: 'audio/mp3' }); // Return audio as a Blob
//   } catch (error) {
//     console.error('Error synthesizing audio:', error);
//     return null;
//   }
// };

// // const TTSComponent = () => {
// //   const [text, setText] = useState('');
// //   const [audioUrl, setAudioUrl] = useState('');

// //   const handleGenerateAudio = async () => {
// //     const audioBlob = await WordAudio(text);
// //     if (audioBlob) {
// //       const url = URL.createObjectURL(audioBlob);
// //       setAudioUrl(url);
// //     }
// //   };

// //   return (
// //     <div>
// //       <input
// //         type="text"
// //         value={text}
// //         onChange={(e) => setText(e.target.value)}
// //         placeholder="Enter text to synthesize"
// //       />
// //       <button onClick={handleGenerateAudio}>Generate Audio</button>
// //       {audioUrl && <audio controls src={audioUrl}></audio>}
// //     </div>
// //   );
// // };

// // export default TTSComponent;