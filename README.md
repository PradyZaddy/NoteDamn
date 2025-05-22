# NoteDamn
> A real-time speech-to-text note-taking web app using WebRTC and OpenAI Whisper — built for creators, thinkers, and fast talkers.

Inspired by **Notre Dame**, built for the **damn note-takers**.

---

## Features

- 🎧 **Start Session**: Capture audio using your microphone.
- 🔄 **Real-Time Streaming**: Stream audio to the backend using WebRTC.
- 🧠 **Whisper AI Integration**: Convert speech to text using OpenAI Whisper.
- 📝 **Live Transcription**: Display transcribed text instantly on the UI.
- ☁️ **Save Notes**: Store and view past sessions (coming soon).

---

## Tech Stack

- **Frontend**: React + Vite + Tailwind CSS
- **Audio Capture**: `MediaDevices API`, `MediaRecorder API`
- **Streaming**: WebRTC (`RTCPeerConnection`, `ICE`)
- **Transcription Engine**: OpenAI Whisper (Python backend)
- **Signaling Server**: WebSocket (Node.js or Python)
- **Deployment**: TBD (Netlify / Vercel + Render / Railway / your choice)
