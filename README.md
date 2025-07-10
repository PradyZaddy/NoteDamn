# Note-Damn

Note-Damn is a real-time smart note-taking and summarization app. It captures spoken content, transcribes it live, and generates concise summaries with AI. Summaries are stored securely and can be sent to email or viewed later from a personalized dashboard.

---

## Features

- Live transcription using WebSockets and AudioWorklet
- Smart summarization with Mistral 7B / OpenAI agent
- Slack integration to send meeting summaries
- Authentication with Firebase (email/password and Google OAuth)
- Dashboard with CRUD functionality for saved summaries
- MongoDB Atlas for storing summaries and user data
- Express.js REST API to connect frontend with the database

---

## Tech Stack

- Frontend: React, Tailwind CSS, Vite
- Backend: Node.js, Express.js
- Database: MongoDB Atlas with Mongoose
- Authentication: Firebase
- Realtime transcription: WebSockets, AudioWorklet
- AI summarization: Mistral 7B 
