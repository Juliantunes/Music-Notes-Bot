import * as processor from 'window-function'
import { hammingWindow } from '../utils/utilities';
import FFT from 'fft-js'



export function processAudio(audioData:Buffer) {
    const sampleRate = 44100; 

    const audioFloats = new Float32Array(audioData.buffer)
    //convert audio data to array of floats

    const maxAmplitude = Math.max(...audioFloats.map(Math.abs))
    //maximum amplitude

    const normalizedAudio =  audioFloats.map(value => value / maxAmplitude)
    //normalize audio 

    const windowedAudio = []

    for (let i = 0; i < audioData.length; i++) {
        const hammingValue = hammingWindow(audioData.length, i);
        const windowedValue = audioData[i] * hammingValue;
        windowedAudio.push(windowedValue);
      }
     // Apply windowing function 

    
    
    const fftSize = 1024
    let fft = processor.FFT(fftSize, sampleRate)
    fft = FFT.forward(windowedAudio)
    // Perform FFT analysis

    const frequencyBins = FFT.s 

    return frequencyBins

}