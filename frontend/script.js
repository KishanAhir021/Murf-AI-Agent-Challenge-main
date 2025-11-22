const statusText = document.getElementById("status-text");
const lastUserText = document.getElementById("last-user-text");
const lastBotText = document.getElementById("last-bot-text");
const micBtn = document.getElementById("mic-btn");

const form = document.getElementById("chat-form");
const input = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

// Backend endpoint
const BACKEND_URL = "http://127.0.0.1:8000/chat";

// ---- Voice input (SpeechRecognition) ----
let recognition = null;
let isListening = false;  // currently recording
let inCall = false;       // call-mode (always listening) on/off

if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  recognition = new SR();
  recognition.lang = "en-US";
  recognition.interimResults = true;
  recognition.continuous = true; // keep stream open

  recognition.onstart = () => {
    isListening = true;
    statusText.textContent = "Live — I'm listening. Just talk.";
    micBtn.classList.remove("mic-idle");
    micBtn.classList.add("mic-listening");
    micBtn.querySelector(".mic-label").textContent = "End Call";
  };

  recognition.onend = () => {
    isListening = false;
    // If user ended the call, stay idle
    if (!inCall) {
      micBtn.classList.remove("mic-listening");
      micBtn.classList.add("mic-idle");
      micBtn.querySelector(".mic-label").textContent = "Start Call";
      if (!statusText.textContent.startsWith("Thinking")) {
        statusText.textContent = "Call ended — tap Start Call to talk again";
      }
      return;
    }

    // If call mode is still ON, auto-restart recognition (for always-listening)
    setTimeout(() => {
      try {
        recognition.start();
      } catch (err) {
        console.error("Error restarting recognition:", err);
        statusText.textContent = "Mic restart error: " + err.message;
      }
    }, 150); // small delay for stability
  };

  recognition.onerror = (event) => {
    console.error("Speech recognition error:", event.error);
    statusText.textContent = "Mic error: " + event.error;
    isListening = false;
    micBtn.classList.remove("mic-listening");
    micBtn.classList.add("mic-idle");
    micBtn.querySelector(".mic-label").textContent = "Start Call";
    inCall = false;
  };

  recognition.onresult = (event) => {
    let transcript = "";
    for (let i = event.resultIndex; i < event.results.length; i++) {
      transcript += event.results[i][0].transcript;
    }
    transcript = transcript.trim();
    if (!transcript) return;

    // Show partial text while user is speaking
    lastUserText.textContent = transcript;

    const isFinal =
      event.results[event.results.length - 1].isFinal === true;

    if (isFinal) {
      // Finalized sentence -> send to backend
      statusText.textContent = "Thinking…";
      sendMessage(transcript);
    }
  };
} else {
  statusText.textContent =
    "Speech recognition not supported. Use text input below.";
}

// ---- Call-mode toggle with one button ----
function startCall() {
  if (!recognition) {
    alert("Your browser does not support Speech Recognition. Try Chrome or Edge.");
    return;
  }
  inCall = true;
  try {
    recognition.start();
  } catch (err) {
    console.error("Error starting recognition:", err);
    statusText.textContent = "Mic start error: " + err.message;
    inCall = false;
  }
}

function endCall() {
  inCall = false;
  try {
    recognition.stop();
  } catch (err) {
    console.error("Error stopping recognition:", err);
  }
}

micBtn.addEventListener("click", () => {
  if (!recognition) {
    alert("Your browser does not support Speech Recognition. Try Chrome or Edge.");
    return;
  }
  if (inCall) {
    endCall();
  } else {
    startCall();
  }
});

// ---- Shared send logic (voice + text) ----
async function sendMessage(message) {
  if (!message) return;

  lastUserText.textContent = message;
  statusText.textContent = "Talking to Groq + Murf…";
  sendBtn.disabled = true;
  micBtn.disabled = true;

  try {
    const res = await fetch(BACKEND_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    if (!res.ok) {
      throw new Error("Backend error: " + res.status);
    }

    const data = await res.json();
    lastBotText.textContent = data.reply || "(empty reply)";
    statusText.textContent = "Reply received — you can talk again";

    if (data.audio_base64) {
      const audio = new Audio(data.audio_base64);
      audio.play().catch((err) => {
        console.error("Audio play failed:", err);
        statusText.textContent = "Audio blocked. Tap anywhere and speak again.";
      });
    }
  } catch (err) {
    console.error(err);
    lastBotText.textContent = "Error: " + err.message;
    statusText.textContent = "Error talking to server";
  } finally {
    sendBtn.disabled = false;
    micBtn.disabled = false;
  }
}

// ---- Text input fallback ----
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    input.value = "";
    sendMessage(text);
  });
}
