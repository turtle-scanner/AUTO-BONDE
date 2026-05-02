from fastapi import FastAPI, HTTPException, WebSocket, WebSocketDisconnect
import asyncio
import random
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import sqlite3
import hashlib
import os
import yfinance as yf
from datetime import datetime
import pytz

app = FastAPI(title="DRAGONFLY API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DB_PATH = os.path.join(os.path.dirname(__file__), 'trading_platform.db')

def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

class SignupRequest(BaseModel):
    username: str
    email: str
    password: str

class LoginRequest(BaseModel):
    username: str
    password: str

@app.post("/api/signup")
def signup(req: SignupRequest):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("SELECT user_id FROM users WHERE email = ?", (req.email,))
    if cursor.fetchone():
        conn.close()
        raise HTTPException(status_code=400, detail="이미 가입된 이메일입니다.")
    hashed_pw = hash_password(req.password)
    try:
        cursor.execute("""
            INSERT INTO users (email, username, password_hash, role_level)
            VALUES (?, ?, ?, ?)
        """, (req.email, req.username, hashed_pw, 1))
        conn.commit()
    except Exception as e:
        conn.close()
        raise HTTPException(status_code=500, detail="회원가입 실패")
    conn.close()
    return {"message": "회원가입 성공"}

@app.post("/api/login")
def login(req: LoginRequest):
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    hashed_pw = hash_password(req.password)
    cursor.execute("""
        SELECT u.user_id, u.username, u.role_level, r.role_name
        FROM users u
        JOIN roles r ON u.role_level = r.level
        WHERE (u.username = ? OR u.email = ?) AND u.password_hash = ?
      """, (req.username, req.username, hashed_pw))
    user = cursor.fetchone()
    conn.close()
    if not user:
        raise HTTPException(status_code=401, detail="아이디 또는 비밀번호가 틀렸습니다.")
    return {
        "message": "로그인 성공",
        "user": {
            "id": user["user_id"],
            "username": user["username"],
            "role_level": user["role_level"],
            "role_name": user["role_name"]
        }
    }

@app.get("/api/market/indices")
def get_market_indices():
    tickers = {"dow": "^DJI", "sp500": "^GSPC", "nasdaq": "^IXIC", "kospi": "^KS11", "kosdaq": "^KQ11"}
    results = {}
    for name, symbol in tickers.items():
        try:
            t = yf.Ticker(symbol)
            hist = t.history(period="5d")
            if len(hist) >= 2:
                current_price = hist['Close'].iloc[-1]
                prev_price = hist['Close'].iloc[-2]
                change = current_price - prev_price
                change_pct = (change / prev_price) * 100
                tz_name = 'US/Eastern' if name in ['dow', 'sp500', 'nasdaq'] else 'Asia/Seoul'
                time_str = datetime.now(pytz.timezone(tz_name)).strftime("%H:%M")
                region = "[USA]" if name in ['dow', 'sp500', 'nasdaq'] else "[KOR]"
                results[name] = {
                    "price": f"{float(current_price):,.2f}",
                    "change_pct": round(float(change_pct), 2),
                    "time": f"{region} {time_str}",
                    "is_up": bool(change >= 0)
                }
            else:
                results[name] = {"price": "0.00", "change_pct": 0.0, "time": "--:--", "is_up": True}
        except Exception as e:
            results[name] = {"price": "0.00", "change_pct": 0.0, "time": "--:--", "is_up": True}
    return results

@app.get("/api/study/chart")
def get_study_chart(ticker: str = "NVDA"):
    try:
        t = yf.Ticker(ticker)
        hist = t.history(period="6mo")
        data = []
        for index, row in hist.iterrows():
            data.append({"time": index.strftime('%Y-%m-%d'), "open": round(row['Open'], 2), "high": round(row['High'], 2), "low": round(row['Low'], 2), "close": round(row['Close'], 2)})
        max_high = hist['High'].max()
        breakout_price = round(max_high * 0.95, 2)
        return {"ticker": ticker, "data": data, "breakout_price": breakout_price}
    except Exception as e:
        return {"error": str(e)}

@app.get("/api/market/heatmap")
def get_heatmap():
    tickers = ["AAPL", "MSFT", "NVDA", "GOOGL", "AMZN", "META", "TSLA"]
    results = []
    for ticker in tickers:
        try:
            t = yf.Ticker(ticker)
            hist = t.history(period="2d")
            if len(hist) >= 2:
                cp = hist['Close'].iloc[-1]
                pp = hist['Close'].iloc[-2]
                pct = ((cp - pp) / pp) * 100
                results.append({"ticker": ticker, "change_pct": round(pct, 2)})
        except:
            continue
    return {"data": results}

@app.websocket("/ws/market")
async def market_websocket(websocket: WebSocket):
    await websocket.accept()
    tickers = ["NVDA", "TSLA", "AAPL", "005930", "000660"]
    try:
        while True:
            # 실시간 시세 시뮬레이션 데이터 생성
            updates = []
            for ticker in tickers:
                price_change = random.uniform(-1, 1)
                updates.append({
                    "ticker": ticker,
                    "price": f"{random.uniform(100, 1000):,.2f}",
                    "change_pct": round(price_change, 2),
                    "is_up": price_change > 0
                })
            
            await websocket.send_json({
                "type": "MARKET_UPDATE",
                "data": updates,
                "timestamp": datetime.now().strftime("%H:%M:%S")
            })
            await asyncio.sleep(2) # 2초마다 전송
    except WebSocketDisconnect:
        print("Client disconnected from WebSocket")
    except Exception as e:
        print(f"WebSocket Error: {e}")
