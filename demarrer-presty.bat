@echo off
cd /d "%~dp0"
echo ========================================
echo PRESTY - Installation et lancement
 echo ========================================
echo.
if not exist node_modules (
  echo Installation des dependances...
  call npm install
  if errorlevel 1 (
    echo.
    echo ERREUR pendant npm install.
    pause
    exit /b 1
  )
)
echo.
echo Lancement de PRESTY...
call npm run dev
pause
