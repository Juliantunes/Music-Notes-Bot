"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processAudio = void 0;
const dsp_js_1 = require("dsp.js");
function processAudio(audioData) {
    const sampleRate = 44100;
    const audioFloats = new Float32Array(audioData.buffer);
    //convert audio data to array of floats
    const maxAmplitude = Math.max(...audioFloats.map(Math.abs));
    //maximum amplitude
    const normalizedAudio = audioFloats.map(value => value / maxAmplitude);
    //normalize audio 
    const windowFunction = dsp_js_1.default.WindowingFunctions.hamming;
    const windowedAudio = windowFunction(normalizedAudio);
    // Apply windowing function 
    const fftSize = 1024;
    const fft = new dsp_js_1.default.FFT(fftSize, sampleRate);
    fft.forward(windowedAudio);
    // Perform FFT analysis
    const frequencyBins = fft.spectrum;
    return frequencyBins;
}
exports.processAudio = processAudio;
