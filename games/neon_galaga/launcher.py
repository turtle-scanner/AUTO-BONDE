import os
import sys
import webbrowser
import threading
import time
from http.server import SimpleHTTPRequestHandler, HTTPServer

def start_server():
    """게임을 호스팅할 로컬 서버 시작 (포트 8888)"""
    # 현재 스크립트의 경로로 작업 디렉토리 변경
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    server = HTTPServer(('127.0.0.1', 8888), SimpleHTTPRequestHandler)
    server.serve_forever()

if __name__ == "__main__":
    # 1. 배경에서 로컬 서버 실행
    server_thread = threading.Thread(target=start_server, daemon=True)
    server_thread.start()
    
    # 2. 서버 안정화 대기
    time.sleep(1.2)
    
    # 3. 크롬 브라우저를 '앱 모드'로 실행 (주소창/툴바 없는 전용 창)
    url = "http://127.0.0.1:8888/index.html"
    
    # 윈도우 크롬 경로 탐색
    chrome_paths = [
        "C:/Program Files/Google/Chrome/Application/chrome.exe",
        "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
        os.path.expanduser("~") + "/AppData/Local/Google/Chrome/Application/chrome.exe"
    ]
    
    chrome_found = False
    for path in chrome_paths:
        if os.path.exists(path):
            os.system(f'"{path}" --app={url} --window-size=620,850')
            chrome_found = True
            break
            
    if not chrome_found:
        # 크롬이 없을 경우 기본 브라우저로 실행
        webbrowser.open(url)
