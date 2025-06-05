import React, { useEffect, useRef, useState } from 'react';

function App() {
  const wsRef = useRef(null);
  const [transcript, setTranscript] = useState('');
  const audioContextRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    console.log('Live transcript:', transcript);
  }, [transcript]);

  const startStream = async () => {
    try {
      streamRef.current = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      audioContextRef.current = new AudioContext({ sampleRate: 16000 });

      await audioContextRef.current.audioWorklet.addModule(
        '/audio-worklet-processor.js',
      );

      const source = audioContextRef.current.createMediaStreamSource(
        streamRef.current,
      );
      const workletNode = new AudioWorkletNode(
        audioContextRef.current,
        'pcm-processor',
      );

      source.connect(workletNode).connect(audioContextRef.current.destination);

      wsRef.current = new WebSocket('ws://localhost:8080');
      wsRef.current.binaryType = 'arraybuffer';

      wsRef.current.onopen = () => {
        console.log('WebSocket connected to backend');
      };

      wsRef.current.onerror = (err) => {
        console.error('WebSocket error:', err);
      };

      wsRef.current.onmessage = (event) => {
        setTranscript((prev) => prev + ' ' + event.data);
        console.log('Transcript received:', event.data);
      };

      workletNode.port.onmessage = (event) => {
        const chunk = event.data;
        const int16Array = new Int16Array(chunk);

        console.log('Frontend audio chunk:', int16Array.slice(0, 10));

        if (wsRef.current.readyState === WebSocket.OPEN) {
          wsRef.current.send(chunk);
        }
      };
    } catch (err) {
      console.error('Error initializing stream:', err);
    }
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

      <div className="transcript-section text-xl whitespace-pre-wrap px-4 py-2">
        {transcript}
      </div>
    </div>
  );
}

export default App;
