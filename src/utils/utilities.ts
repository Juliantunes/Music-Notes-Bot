import record from 'node-mic-record'
const fs = require('fs')


const file = fs.createWriteStream('test.wav', { encoding: 'binary' })


let isRecording = false
let isPaused = false


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

export function pauseRecording() {
    if(isRecording && !isPaused) {
        isPaused = true
        console.log('Recording paused.')
    }
}

export function resumeRecording () {
    if (!isRecording && isPaused) {
        isPaused = false; 
        console.log('Recording resumed.')

    }
}

export function deleteRecording() {
    if(!isRecording) {
        file.end()
        fs.unlinkSync('test.wav')
        console.log('Recording deleted.')
    } else {
        console.log('Stop recording before deleteing.')
    }
}