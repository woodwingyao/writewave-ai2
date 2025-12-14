@echo off
echo Cleaning npm cache and reinstalling...
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del package-lock.json
npm cache clean --force
npm install
echo.
echo Installation complete!
pause
