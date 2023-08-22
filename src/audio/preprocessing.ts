import processor from 'dsp.js'
import Tuna from 'tunajs'

export function processAudio(audioData:Buffer) {
    const sampleRate = 44100; 

    const audioFloats = new Float32Array(audioData.buffer)
    //convert audio data to array of floats

    const maxAmplitude = Math.max(...audioFloats.map(Math.abs))
    //maximum amplitude

    const normalizedAudio =  audioFloats.map(value => value / maxAmplitude)
    //normalize audio 

    const windowFunction = processor.WindowingFunctions.hamming
    const windowedAudio = windowFunction(normalizedAudio)
     // Apply windowing function 

    
    
    const fftSize = 1024
    const fft = new processor.FFT(fftSize, sampleRate)
    fft.forward(windowedAudio)
    // Perform FFT analysis

    const frequencyBins = fft.spectrum 

    return frequencyBins

}