@echo off
echo Installing required packages for backend...
pip install fastapi uvicorn pydantic yfinance pytz passlib

echo Initialize database...
python database.py

echo Starting backend...
uvicorn main:app --reload --host 0.0.0.0 --port 8000
pause
