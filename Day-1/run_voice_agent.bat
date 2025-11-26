@echo off
echo ===========================================
echo   Groq + Murf Voice Agent - Auto Launcher
echo ===========================================
echo.

REM --- Change path to your project backend folder ---
set PROJECT_BACKEND=PATH_OF_BACKEND
REM --- Change path to your project frontend folder ---
set PROJECT_FRONTEND=PATH_OF_FRONTEND

cd /d "%PROJECT_BACKEND%"

echo Setting API keys...

REM --- Your API KEYS ---
set GROQ_API_KEY=YOUR_GROK_API_KEY
set GROK_API_KEY=YOUR_GROK_API_KEY
set MURF_API_KEY=YOUR_MURF_API_KEY
echo API keys loaded.
echo.

echo Activating Python venv...
call venv\Scripts\activate

echo.
echo ============================
echo  Starting Backend Server...
echo ============================
echo.

REM --- Start backend in a new window ---
start "VoiceAgent Backend" cmd /k "cd /d %PROJECT_BACKEND% && call venv\Scripts\activate && py -m uvicorn app:app --reload --port 8000"

echo.
echo =============================
echo  Opening Frontend in Chrome
echo =============================
echo.

REM --- Change chrome path if needed ---
set CHROME_PATH="C:\Program Files\Google\Chrome\Application\chrome.exe"

REM --- Open index.html ---
start "" %CHROME_PATH% "%PROJECT_FRONTEND%\index.html"

echo.
echo Done! Your voice agent is running.
echo Close this window any time.
pause
