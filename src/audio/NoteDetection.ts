
import { Tonal } from "tonal";


export function NoteDetection(frequencyBins:number[]) {
const fftSize = 1024
const sampleRate = 44100

const frequencyResolution = sampleRate/fftSize

for(let binIndex = 0; binIndex<frequencyBins.length; binIndex++){
    const frequencyHz = binIndex * frequencyResolution

    const noteName = Tonal.toNoteName(frequencyHz)

    console.log(`Frequency (Hz): ${frequencyHz}, Note : ${noteName}`)
}
}