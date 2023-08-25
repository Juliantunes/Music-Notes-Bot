"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hammingWindow = exports.deleteRecording = exports.resumeRecording = exports.pauseRecording = exports.stopRecording = exports.startRecording = void 0;
const node_mic_record_1 = require("node-mic-record");
const fs = require('fs');
const file = fs.createWriteStream('test.wav', { encoding: 'binary' });
let isRecording = false;
let isPaused = false;
function startRecording() {
    if (!isRecording) {
        isRecording = true;
        console.log('Recording started. Say "stop" to end recording.');
    }
}
exports.startRecording = startRecording;
function stopRecording() {
    if (isRecording) {
        isRecording = false;
        node_mic_record_1.default.stop(); // Stop recording
        file.end(); // Close the file stream
        console.log('Recording stopped.');
    }
}
exports.stopRecording = stopRecording;
function pauseRecording() {
    if (isRecording && !isPaused) {
        isPaused = true;
        console.log('Recording paused.');
    }
}
exports.pauseRecording = pauseRecording;
function resumeRecording() {
    if (!isRecording && isPaused) {
        isPaused = false;
        console.log('Recording resumed.');
    }
}
exports.resumeRecording = resumeRecording;
function deleteRecording() {
    if (!isRecording) {
        file.end();
        fs.unlinkSync('test.wav');
        console.log('Recording deleted.');
    }
    else {
        console.log('Stop recording before deleteing.');
    }
}
exports.deleteRecording = deleteRecording;
function hammingWindow(length, index) {
    return 0.54 - 0.46 * Math.cos(2 * Math.PI * index / (length - 1));
}
exports.hammingWindow = hammingWindow;
