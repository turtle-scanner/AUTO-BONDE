import requests
import os
from dotenv import load_dotenv

load_dotenv()
token = os.environ.get("TELEGRAM_TOKEN")
chat_id = "7998778160"

url = f"https://api.telegram.org/bot{token}/sendMessage"
data = {"chat_id": chat_id, "text": "테스트 메시지입니다. 이 메시지가 보인다면 토큰은 정상입니다."}

try:
    response = requests.post(url, data=data)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.json()}")
except Exception as e:
    print(f"Error: {e}")
