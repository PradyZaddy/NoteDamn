class PCMProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
  }

  process(inputs) {
    const inputChannel = inputs[0][0]; // this creates a mono audio channel

    if (inputChannel) {
      const pcm = new Int16Array(inputChannel.length);

      // we need to convert the float32 format to Int16 format so that the audio can be used for fast-Whister
      for (let i = 0; i < inputChannel.length; i++) {
        const s = Math.max(-1, Math.min(1, inputChannel[i]));
        pcm[i] = s * 0x7fff;
      }

      // need to send raw audio chunk to the main thread and since we can only send array of binary type, hence we are sending a buffer
      this.port.postMessage(pcm.buffer);
    }

    return true;
  }
}

registerProcessor('pcm-processor', PCMProcessor);

/* 
Worklet is a part of Web Audio API. Allows us to run JS on a another separate thread and not on the main thread so that we can process
audio without interrupting other main processes. Use cases: real-time audio manipulation, creating virtual instruments, streaming to a 
server.

We create this processor.js file. We connect this processor and the AudioContext so that we can send/receive data to/from the processor
In our case, the term "processing" means that we are sending each sample to our backend after converting it to the desired format.
*/
