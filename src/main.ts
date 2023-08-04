import record from 'node-mic-record'
import processer from 'dsp.js'
import pitchFinder from 'pitchfinder'
import noteFinder from 'notejs'
import {Readable} from 'stream'
import { startRecording, stopRecording } from './utils/utilities'
const fs = require('fs')
let isRecording = false

const file = fs.createWriteStream('test.wav', {encoding:'binary'})

const recordingStream = record.start({
    sampleRate: 44100, 
    verbose: true
})

recordingStream.on('data', (data:string)=> {
    if (isRecording) {
        file.write(data)
    }
})

process.stdin.setEncoding('utf8')
process.stdin.on('data', (input) => {
    const userInput = input.toString().trim().toLowerCase()

    if (userInput === 'start') {
        startRecording()
    } else if (userInput === 'stop') {
        stopRecording()
    }
})


