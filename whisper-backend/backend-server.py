import asyncio
import websockets
import numpy as np
import soundfile as sf
from faster_whisper import WhisperModel
import tempfile

# Load Whisper model
model = WhisperModel("base", device="cpu", compute_type="int8")

SAMPLE_RATE = 16000
MIN_RMS_THRESHOLD = 0.01
audio_buffer = bytearray()

# Transcription + send
async def transcribe_and_send(ws):
    global audio_buffer

    if len(audio_buffer) < SAMPLE_RATE * 6:  
        return

    audio_np = np.frombuffer(audio_buffer, dtype=np.int16).astype(np.float32) / 32768.0

# only for debug and shi below
    print("audio_np[:10]:", audio_np[:10])
    print("shape:", audio_np.shape)
    print("Raw buffer length:", len(audio_buffer))

    rms = np.sqrt(np.mean(audio_np ** 2))
    print("RMS:", rms)

    if rms < MIN_RMS_THRESHOLD:
        print("Skipping silent chunk")
        audio_buffer = bytearray()
        return

# only for debug and shi above


    try:
        segments, _ = model.transcribe(
            "debug.wav",
            beam_size=5,
            word_timestamps=True,
            vad_filter=True,
            condition_on_previous_text=False,
            vad_parameters={"min_silence_duration_ms": 500}
        )

        for segment in segments:
            text = segment.text.strip()
            if text:
                await ws.send(text)
                print("Transcription sent:", text)

    except Exception as e:
        print("Transcription failed:", e)

    audio_buffer = bytearray()

# WebSocket handler
async def handler(websocket):
    print("Client connected")
    try:
        async for message in websocket:
            audio_buffer.extend(message)
            await transcribe_and_send(websocket)
    except websockets.exceptions.ConnectionClosed:
        print("Client disconnected")

# Main entry point
async def main():
    async with websockets.serve(handler, "localhost", 8080):
        print("Server running on ws://localhost:8080")
        await asyncio.Future()

if __name__ == "__main__":
    asyncio.run(main())
