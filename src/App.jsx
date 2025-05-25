import React, { useEffect, useRef, useState } from 'react';

function App() {
  const localStreamRef = useRef(null);
  const wsRef = useRef(null);
  const pcRef = useRef(null);
  const [connected, setConnected] = useState(false);

  const SIGNALLING_SERVER = 'ws://localhost:8080'; // same as in the server.js
  const ICE_SERVERS = {
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' }, // public STUN server
    ],
  };

  useEffect(() => {
    return () => {
      if (pcRef.current) {
        pcRef.current.close();
      }

      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  const startSession = async () => {
    // this opens the WebSocket signalling server
    wsRef.current = new WebSocket(SIGNALLING_SERVER);

    wsRef.current.onopen = async () => {
      console.log('Websocket connected to the Signalling Server');

      // this creates the RTC Peer connection
      const pc = new RTCPeerConnection(ICE_SERVERS);
      pcRef.current = pc;

      // this captures the audio and put it on our peer connection in real-time
      const localStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      localStreamRef.current = localStream;
      localStream.getTrack().forEach((track) => {
        pc.addTrack(audio, localStream);
      });
      console.log('Microphone access granted!');
    };
  };

  return (
    <div className="main_container">
      <div className="text-5xl">Notes-Damn</div>

      <div className="flex items-center">
        <button
          className="bg-black border-2 text-white mx-auto my-12 px-8 justify-center text-center py-5 rounded-4xl hover:bg-white hover:text-black hover:border-black hover:border-2 hover:transition-colors duration-300 ease-in-out"
          onClick={() => startSession()}
        >
          Start Session
        </button>

        <button className="bg-black border-2 text-white mx-auto my-12 px-8 justify-center text-center py-5 rounded-4xl hover:bg-white hover:text-black hover:border-black hover:border-2 hover:transition-colors duration-300 ease-in-out">
          Stop Session
        </button>
      </div>
    </div>
  );
}

export default App;
