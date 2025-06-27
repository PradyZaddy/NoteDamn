import React, { useEffect, useRef, useState } from 'react';
import { runAgent } from '../../agent-wrapper/agent-wrapper';

function SessionPage() {
  const wsRef = useRef(null);
  const streamRef = useRef(null);
  const audioContextRef = useRef(null);

  const [transcript, setTranscript] = useState('');
  const [summary, setSummary] = useState('');

  useEffect(() => {
    console.log('Live transcript:', transcript);
  }, [transcript]);

  const startStream = async () => {
    try {
      streamRef.current = await navigator.mediaDevices.getUserMedia({
        audio: true, // gets the mic permission
      });
      audioContextRef.current = new AudioContext({ sampleRate: 16000 });

      await audioContextRef.current.audioWorklet.addModule(
        '/audio-worklet-processor.js',
      ); // loads the worklet processor

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

        // console.log('Frontend audio chunk:', int16Array.slice(0, 10));

        if (wsRef.current.readyState === WebSocket.OPEN) {
          wsRef.current.send(chunk);
        }
      };
    } catch (err) {
      console.error('Error initializing stream:', err);
    }
  };

  const stopStream = async () => {
    wsRef.current.close();
    streamRef.current?.getTracks().forEach((t) => t.stop());
    audioContextRef.current?.close();

    console.log(
      'Stream session has stopped! Sending transcript to Mistral now!',
    );
    const bufferSummary = await runAgent(transcript);
    setSummary(bufferSummary);
    // console.log(summary);
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center mt-15">
        <p className="text-4xl text-black font-semibold">Start a Session</p>

        <div>
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

      <div className="ml-5">
        <p className="text-3xl text-black font-semibold">Transcription</p>
        <p className="font-light">
          Real-time transcription will appear here as you speak. Once the
          session ends, a summary will be generated.
        </p>

        <textarea
          className="w-[40%] h-40 p-4 rounded-lg border text-white resize-none mt-6"
          style={{ backgroundColor: '#F2F0F5', borderColor: '#473D54' }}
          value={transcript}
          readOnly
        />

        <p className="text-3xl text-black font-semibold mt-6">Summary</p>

        <textarea
          className="w-[40%] h-40 p-4 rounded-lg border text-white resize-none mt-6"
          style={{ backgroundColor: '#F2F0F5', borderColor: '#473D54' }}
          value={transcript}
          readOnly
        />
      </div>
    </div>
  );
}

export default SessionPage;

{
  /* <div className="text-5xl">Note-Damn</div>

      <div className="flex items-center">
        
      </div>

      <div className="transcript-section text-xl whitespace-pre-wrap px-4 py-2">
        {transcript}
      </div>

      <div className="text-4xl">{summary}</div> */
}
