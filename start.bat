@echo off
echo ==========================================
echo    KidDok Project Initializer
echo ==========================================
echo.
echo Installing dependencies... This may take a minute!
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo npm install failed. Please make sure Node.js is installed.
    pause
    exit /b
)

echo.
echo ------------------------------------------
echo Starting the Angular Development Server...
echo ------------------------------------------
echo The app will open in your browser automatically.
echo Keep this window open while you test the app!
echo.
call npm start -- --open
pause
