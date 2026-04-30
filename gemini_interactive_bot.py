import os
import telebot
import google.generativeai as genai
from datetime import datetime

# 설정 (방금 주신 키와 기존 텔레그램 설정을 사용합니다)
GEMINI_API_KEY = "AIzaSyBOnusu-wC2dTojQM5zdJto2D-XNfoFaHQ"

# .env 파일에서 텔레그램 토큰 로드
if os.path.exists(".env"):
    with open(".env", "r") as f:
        for line in f:
            if "=" in line:
                key, val = line.strip().split("=", 1)
                os.environ[key] = val

TELEGRAM_TOKEN = os.environ.get("TELEGRAM_TOKEN", "")

# 제미나이 설정
genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel('gemini-1.5-flash') # 빠르고 똑똑한 최신 모델
chat_sessions = {} # 사용자별 대화 기록 저장

# 텔레그램 봇 설정
bot = telebot.TeleBot(TELEGRAM_TOKEN)

@bot.message_handler(commands=['start', 'help'])
def send_welcome(message):
    bot.reply_to(message, "안녕하세요! 저는 제미나이 AI 비서입니다. 무엇이든 물어보세요! 😊")

@bot.message_handler(func=lambda message: True)
def handle_message(message):
    chat_id = message.chat.id
    
    # 해당 사용자의 대화 세션이 없으면 생성
    if chat_id not in chat_sessions:
        chat_sessions[chat_id] = model.start_chat(history=[])
    
    try:
        # '입력 중...' 상태 표시
        bot.send_chat_action(chat_id, 'typing')
        
        # 제미나이에게 메시지 전송
        response = chat_sessions[chat_id].send_message(message.text)
        
        # 답변 전송
        bot.reply_to(message, response.text, parse_mode='Markdown')
        
    except Exception as e:
        print(f"Error: {e}")
        bot.reply_to(message, "죄송합니다. 대화 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.")

if __name__ == "__main__":
    print(f"[{datetime.now()}] 제미나이 AI 비서 봇 가동 시작...")
    bot.infinity_polling()
