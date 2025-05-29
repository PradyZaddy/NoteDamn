import React, { useEffect, useRef, useState } from 'react';

function App() {
  const wsRef = useRef(null);
  const [transcript, setTranscript] = useState('');
  const audioContextRef = useRef(null);
  const streamRef = useRef(null);

  const startStream = async () => {
    streamRef.current = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });

    // setting up the audio context and loading the audio worklet
    audioContextRef.current = new AudioContext();
    await audioContextRef.current.audioWorklet.addModule(
      '/audio-worklet-processor.js',
    );

    const source = audioContextRef.current.createMediaStreamSource(
      streamRef.current,
    ); // loading our stream here
    const workletNode = new AudioWorkletNode(
      audioContextRef.current,
      'pcm-processor',
    ); // this helps sending messages from/to main thread and processor

    // setting up the websocket connection now
    wsRef.current = new WebSocket('ws://localhost:8080');
    wsRef.current.binaryType = 'arraybuffer';

    // listen for transcript messages // CHECK-POINT
    wsRef.current.onmessage = (event) => {
      setTranscript((prev) => prev + ' ' + event.data); // word-by-word
    };

    // on receiving audio from the processor, send to backend
    workletNode.port.onmessage = (event) => {
      const pcmBuffer = event.data;
      if (wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.send(pcmBuffer);

        console.log('Audio chunk is sent');
      }
    };

    source.connect(workletNode).connect(audioContextRef.current.destination);
  };

  const stopStream = () => {
    wsRef.current.close();
    streamRef.current?.getTracks().forEach((t) => t.stop());
    audioContextRef.current?.close();

    console.log('Stream session has stopped!');
  };

  return (
    <div className="main_container">
      <div className="text-5xl">Notes-Damn</div>

      <div className="flex items-center">
        <button
          className="bg-black border-2 text-white mx-auto my-12 px-8 justify-center text-center py-5 rounded-4xl hover:bg-white hover:text-black hover:border-black hover:border-2 hover:transition-colors duration-300 ease-in-out"
          onClick={() => startStream()}
        >
          Start Session
        </button>

        <button
          className="bg-black border-2 text-white mx-auto my-12 px-8 justify-center text-center py-5 rounded-4xl hover:bg-white hover:text-black hover:border-black hover:border-2 hover:transition-colors duration-300 ease-in-out"
          onClick={() => stopStream()}
        >
          Stop Session
        </button>
      </div>
    </div>
  );
}

export default App;
