import React, { useEffect, useRef, useState } from 'react';
import { runAgent } from '../../agent-wrapper/agent-wrapper';
import Header2 from '../components/Header2.jsx';
import { getAuth } from 'firebase/auth';

function SessionPage() {
  const wsRef = useRef(null);
  const streamRef = useRef(null);
  const audioContextRef = useRef(null);

  const [transcript, setTranscript] = useState('');
  const [summary, setSummary] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [summaryGenerated, setSummaryGenerated] = useState(false);
  const [loading, setLoading] = useState(false);

  const auth = getAuth();
  const userId = auth.currentUser?.uid;

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

        if (wsRef.current.readyState === WebSocket.OPEN) {
          wsRef.current.send(chunk);
        }
      };

      setIsStreaming(true);
    } catch (err) {
      console.error('Error initializing stream:', err);
    }
  };

  const stopStream = async () => {
    try {
      wsRef.current?.close();
      streamRef.current?.getTracks().forEach((t) => t.stop());
      audioContextRef.current?.close();

      console.log(
        'Stream session has stopped! Sending transcript to Mistral now!',
      );

      setLoading(true);

      const bufferSummary = await runAgent(transcript, userId);
      setSummary(bufferSummary);
      setSummaryGenerated(true);
    } catch (err) {
      console.error('Error stopping stream:', err);
    } finally {
      setIsStreaming(false);
      setLoading(false);
    }
  };

  return (
    <div>
      <Header2 />
      <div className="flex flex-col justify-center items-center mt-20">
        <p className="text-4xl text-black font-semibold">Start a Session</p>

        <div className="flex gap-4">
          {!isStreaming && (
            <button
              className="bg-[#7847EB] border-2 border-[#7847EB] text-white mx-auto mt-12 my-4 px-8 justify-center text-center py-5 rounded-4xl hover:bg-white hover:text-[#7847EB] hover:border-[#7847EB] transition-colors duration-300 ease-in-out"
              onClick={startStream}
            >
              Start Session
            </button>
          )}

          {isStreaming && (
            <button
              className="bg-black border-2 text-white mx-auto my-12 px-8 justify-center text-center py-5 rounded-4xl hover:bg-white hover:text-black hover:border-black transition-colors duration-300 ease-in-out"
              onClick={stopStream}
            >
              Stop Session
            </button>
          )}
        </div>

        <div className="flex flex-col justify-center items-center w-[80%]">
          <p className="text-3xl text-black font-semibold mt-6">
            Transcription
          </p>
          <p className="font-light">
            Real-time transcription will appear here as you speak. Once the
            session ends, a summary will be generated.
          </p>

          <textarea
            className="w-full h-70 p-4 rounded-lg border text-black font-light resize-none mt-6"
            style={{ borderColor: '#473D54' }}
            value={transcript}
            placeholder="Transcription will appear here..."
            readOnly
          />

          {loading && (
            <div>
              <p className="text-3xl text-black font-semibold mt-10">
                Generating Summary, please wait...
              </p>
            </div>
          )}

          {summaryGenerated && (
            <>
              <p className="text-3xl text-black font-semibold mt-6">Summary</p>
              <textarea
                className="w-full h-70 p-4 rounded-lg border text-black font-light resize-none mt-6 mb-15"
                style={{ borderColor: '#473D54' }}
                value={summary}
                placeholder="Summary will appear here after the session..."
                readOnly
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default SessionPage;
