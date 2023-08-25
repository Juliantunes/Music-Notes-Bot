"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const record = require("node-mic-record");
const utilities_1 = require("./utils/utilities");
const preprocessing_1 = require("./audio/preprocessing");
const NoteDetection_1 = require("./audio/NoteDetection");
const fs = require('fs');
let isRecording = false;
let isPaused = false;
//isRecording and isPaused initialized to false
const file = fs.createWriteStream('test.wav', { encoding: 'binary' });
//create a file so audio can be saved
//test.wav is common file type for audio
//encoding is binary because audio is a sequence of numerical values
const recordingStream = record.start({
    sampleRate: 44100,
    verbose: true,
    length: 180
})
    .pipe(file);
//calls audio recording process
recordingStream.on('data', (data) => {
    if (isRecording && !isPaused) {
        file.write(data);
    }
});
//check if it is recording and it is not paused and writes to file
process.stdin.setEncoding('utf8');
process.stdin.on('data', (input) => {
    const userInput = input.toString().trim().toLowerCase();
    if (userInput === 'start') {
        (0, utilities_1.startRecording)();
    }
    else if (userInput === 'stop') {
        (0, utilities_1.stopRecording)();
    }
    else if (userInput === 'pause') {
        (0, utilities_1.pauseRecording)();
    }
    else if (userInput === 'resume') {
        (0, utilities_1.resumeRecording)();
    }
    else if (userInput === 'delete') {
        (0, utilities_1.deleteRecording)();
    }
    else {
        console.log('Unrecognized command');
    }
});
// User Input Handling:
// - `process.stdin.setEncoding('utf8')`: Sets the character encoding for user input.
// - `process.stdin.on('data', (input) => { ... })`: Listens for user input events.
// - `const userInput = input.toString().trim().toLowerCase()`: Converts and transforms input.
// - `if` and `else if` conditions: Executes functions based on transformed user input.
//   - e.g., "start" triggers `startRecording()`, "stop" triggers `stopRecording()`, etc.
// Provides an interactive command line interface to control recording actions.
const filePath = 'test.wav';
fs.readFile(filePath, (err, audioData) => {
    if (err) {
        console.log('Error reading audio file:', err);
        return;
    }
    const processedData = (0, preprocessing_1.processAudio)(audioData);
    (0, NoteDetection_1.NoteDetection)(processedData);
});
