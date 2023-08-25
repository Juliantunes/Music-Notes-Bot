"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processAudio = void 0;
const processor = require("window-function");
const utilities_1 = require("../utils/utilities");
function processAudio(audioData) {
    const sampleRate = 44100;
    const audioFloats = new Float32Array(audioData.buffer);
    //convert audio data to array of floats
    const maxAmplitude = Math.max(...audioFloats.map(Math.abs));
    //maximum amplitude
    const normalizedAudio = audioFloats.map(value => value / maxAmplitude);
    //normalize audio 
    const windowedAudio = [];
    for (let i = 0; i < audioData.length; i++) {
        const hammingValue = (0, utilities_1.hammingWindow)(audioData.length, i);
        const windowedValue = audioData[i] * hammingValue;
        windowedAudio.push(windowedValue);
    }
    // Apply windowing function 
    const fftSize = 1024;
    let fft = processor.FFT(fftSize, sampleRate);
    fft = fft.forward(windowedAudio);
    // Perform FFT analysis
    const frequencyBins = fft.spectrum;
    return frequencyBins;
}
exports.processAudio = processAudio;
