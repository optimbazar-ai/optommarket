@echo off
echo ========================================
echo   AI FEATURES SETUP - OptoMarket.uz
echo ========================================
echo.

echo [1/3] Installing backend dependencies...
cd backend
call npm install @google/generative-ai node-telegram-bot-api
if %errorlevel% neq 0 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)
echo ✓ Backend dependencies installed
echo.

echo [2/3] Checking .env file...
if not exist .env (
    echo WARNING: .env file not found!
    echo Please create .env file and add:
    echo   GEMINI_API_KEY=your_key_here
    echo   TELEGRAM_BOT_TOKEN=your_token_here
    echo.
) else (
    echo ✓ .env file exists
)

echo [3/3] Setup complete!
echo.
echo ========================================
echo   NEXT STEPS:
echo ========================================
echo.
echo 1. Get Gemini API Key:
echo    https://makersuite.google.com/app/apikey
echo.
echo 2. Add to backend/.env:
echo    GEMINI_API_KEY=your_key_here
echo.
echo 3. (Optional) Create Telegram Bot:
echo    - Find @BotFather on Telegram
echo    - Send /newbot
echo    - Add token to .env
echo.
echo 4. Start backend server:
echo    cd backend
echo    npm run dev
echo.
echo 5. Test chatbot on website:
echo    http://localhost:3000
echo.
echo ========================================
echo   See AI_INTEGRATION_GUIDE.md for full docs
echo ========================================
echo.

cd ..
pause
