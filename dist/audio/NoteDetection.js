"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteDetection = void 0;
const tonal_1 = require("tonal");
function NoteDetection(frequencyBins) {
    const fftSize = 1024;
    const sampleRate = 44100;
    const frequencyResolution = sampleRate / fftSize;
    for (let binIndex = 0; binIndex < frequencyBins.length; binIndex++) {
        const frequencyHz = binIndex * frequencyResolution;
        const noteName = tonal_1.Tonal.toNoteName(frequencyHz);
        console.log(`Frequency (Hz): ${frequencyHz}, Note : ${noteName}`);
    }
}
exports.NoteDetection = NoteDetection;
