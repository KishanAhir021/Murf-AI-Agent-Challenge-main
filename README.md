#🎤 Day 01 – Groq + Murf Voice Agent
Part of the Murf AI Voice Agent Challenge – 10 Days of AI Voice Agents This repository contains my Day 01 project, where I built a fully functional, real-time AI voice agent powered by Groq Llama for ultra-fast reasoning and Murf Falcon for high-quality text-to-speech output. The agent listens to your voice, understands your message, and replies back instantly using Murf’s natural-sounding voice. It supports Call Mode, meaning you can speak continuously without repeatedly pressing a button — similar to interacting with a smart voice assistant.

##🚀 Features 🎙 Continuous Voice Input The browser listens in real time using the Web SpeechRecognition API. ⚡ Ultra-Fast LLM Responses Uses Groq’s Llama-3.1 8B Instant model for rapid, intelligent responses. 🔊 Natural TTS Output Replies are converted to audio using Murf Falcon (GEN2) and streamed back to the UI. 📞 Call Mode (Always Listening) Tap the mic once → agent listens and replies automatically. 🌐 Simple Frontend UI Clean HTML/CSS/JS interface to display messages and play TTS audio. 🧩 FastAPI Backend Handles:

STT → LLM → TTS pipeline

Returning Base64 MP3 audio

CORS + JSON communication

#🗂 Project Structure
/backend app.py requirements.txt .env.example

/frontend index.html script.js style.css

run_voice_agent.bat # One-click auto launcher

#🛠 Tech Stack
ComponentTechnologyLLMGroq Llama-3.1 8B InstantTTSMurf Falcon GEN2BackendFastAPI + UvicornFrontendHTML, CSS, JavaScriptVoice InputWeb SpeechRecognition APIAudio OutputHTML5 Audio Element

#📦 Installation & Setup

#1. Clone the repo
git clone https://github.com//day1-groq-murf-voice-agent.git cd day1-groq-murf-voice-agent/backend

#2. Install dependencies
python -m venv venv venv\Scripts\activate pip install -r requirements.txt

#3. Add your API keys
Option A — Using .env (recommended) Create a file in /backend: GROQ_API_KEY=your_groq_key_here MURF_API_KEY=your_murf_key_here

#Option B — Using the .bat launcher Edit run_voice_agent.bat: set GROQ_API_KEY=YOUR_GROQ_KEY set GROK_API_KEY=YOUR_GROQ_KEY set MURF_API_KEY=YOUR_MURF_KEY

set PROJECT_BACKEND=C:\Path\To\backend set PROJECT_FRONTEND=C:\Path\To\frontend

⚠️ Do NOT commit real API keys to GitHub.

#🚀 How to Run
Option A — Manual (Backend + Frontend) Start backend cd backend venv\Scripts\activate uvicorn app:app --reload --port 8000

Start frontend Open directly: frontend/index.html

Or run via local server: cd frontend python -m http.server 5500

Visit: http://localhost:5500/

#Option B — One-Click Auto Launcher (Windows)
Just double-click: run_voice_agent.bat

This will:

Load API keys

Activate the venv

Start backend

Open the frontend in Chrome

🎬 Day 01 Challenge Completed For the Day 1 requirement, I:

Built the voice agent

Connected it through the browser

Tested live conversations

Recorded a short demo

Posted it on LinkedIn with

#MurfAIVoiceAgentsChallenge

#10DaysofAIVoiceAgents

Mentioned Murf Falcon + Groq

📌 Future Improvements (Day 02+)

Streaming Groq responses

Streaming Murf TTS

Replace browser STT with Groq Whisper

Add better UI + animations

Add conversation memory

Deploy backend online

🤝 Acknowledgments Huge thanks to Murf AI for organizing this challenge and to Groq for insanely fast inference speeds.

If you'd like, I can create: 🎨 a GitHub banner image, 📄 a short LinkedIn post, 📁 a LICENSE file, or ⚙️ help with Day 02.
