import record from 'node-mic-record'
const fs = require('fs')


const file = fs.createWriteStream('test.wav', { encoding: 'binary' })


let isRecording = false


export function startRecording() {
    if (!isRecording) {
      isRecording = true;
      console.log('Recording started. Say "stop" to end recording.');
    }
  }
  
export function stopRecording() {
    if (isRecording) {
      isRecording = false;
      record.stop(); // Stop recording
      file.end(); // Close the file stream
      console.log('Recording stopped.');
    } }