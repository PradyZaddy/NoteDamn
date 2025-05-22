import React, { useState } from 'react';

function App() {
  const [mediaRecorder, setMediaRecorder] = useState(null);

  const startAudioCapture = async () => {
    // line below will wait until the user gives permission to use a mic, else it wont work and thats why we used async and await
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);

    recorder.ondataavailable = (event) => {
      // need to handle the audio chunks - send to backend and save it!
      if (event.data.size > 0) {
        console.log('Data is available: ', event.data);
      }
    };

    recorder.start();
    setMediaRecorder(recorder);
    console.log('Recording has started!');
  };

  const stopAudioCapture = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      console.log('Recording has stopped!');
    }
  };

  return (
    <div className="main_container">
      <div className="text-5xl">Notes-Damn</div>

      <div className="flex items-center">
        <button
          className="bg-black border-2 text-white mx-auto my-12 px-8 justify-center text-center py-5 rounded-4xl hover:bg-white hover:text-black hover:border-black hover:border-2 hover:transition-colors duration-300 ease-in-out"
          onClick={() => startAudioCapture()}
        >
          Start Session
        </button>

        <button
          className="bg-black border-2 text-white mx-auto my-12 px-8 justify-center text-center py-5 rounded-4xl hover:bg-white hover:text-black hover:border-black hover:border-2 hover:transition-colors duration-300 ease-in-out"
          onClick={() => stopAudioCapture()}
        >
          Stop Session
        </button>
      </div>
    </div>
  );
}

export default App;
