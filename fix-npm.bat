@echo off
echo ========================================
echo Fixing NPM Corrupted Cache Issue
echo ========================================
echo.

echo Step 1: Deleting node_modules folder...
if exist node_modules (
    rmdir /s /q node_modules
    echo Done.
) else (
    echo node_modules not found, skipping.
)
echo.

echo Step 2: Deleting package-lock.json...
if exist package-lock.json (
    del /f /q package-lock.json
    echo Done.
) else (
    echo package-lock.json not found, skipping.
)
echo.

echo Step 3: Finding npm cache location...
for /f "delims=" %%i in ('npm config get cache') do set CACHE_PATH=%%i
echo Cache location: %CACHE_PATH%
echo.

echo Step 4: Deleting entire npm cache folder...
if exist "%CACHE_PATH%" (
    rmdir /s /q "%CACHE_PATH%"
    echo Cache deleted successfully.
) else (
    echo Cache folder not found.
)
echo.

echo Step 5: Recreating npm cache...
call npm cache verify
echo.

echo Step 6: Installing packages with verbose output...
call npm install --verbose
echo.

if errorlevel 1 (
    echo ========================================
    echo INSTALLATION FAILED!
    echo ========================================
    echo.
    echo Please try these alternative steps:
    echo 1. Restart your computer
    echo 2. Update Node.js from https://nodejs.org
    echo 3. Run this script again
    echo.
) else (
    echo ========================================
    echo SUCCESS! Installation Complete!
    echo ========================================
    echo.
    echo You can now run: npm run build
    echo.
)

pause
