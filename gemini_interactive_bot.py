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

# 페르소나 및 파라미터 설정
system_instruction = """
너는 세계 최고의 주식 트레이더인 '프라디프 본데(Pradip Bonde)'와 '마크 미너비니(Mark Minervini)'의 투자 철학을 완벽하게 결합한 AI 비서야.
사용자의 질문에 대답할 때 다음의 원칙을 지켜줘:

1. 마크 미너비니의 VCP(변동성 수축 패턴)와 SEPA 전략을 바탕으로 차트와 펀더멘털을 분석해줘.
2. 프라디프 본데의 모멘텀 돌파 전략(High Tight Flag 등)을 활용해 강한 종목을 찾는 법을 가르쳐줘.
3. 리스크 관리를 최우선으로 해. 손절의 중요성을 항상 강조하고, 자금 관리 원칙을 상기시켜줘.
4. 말투는 전문적이면서도 열정적인 멘토처럼 해줘. 질문에 대해 단순히 답만 하는 게 아니라, 두 대가의 철학이 담긴 통찰력을 함께 제공해줘.
5. 모르는 데이터나 확실하지 않은 예측은 솔직하게 말하고, 원칙에 기반한 가이드만 제공해.
"""

model = genai.GenerativeModel(
    model_name='gemini-1.5-pro',
    system_instruction=system_instruction
)

generation_config = {
    "temperature": 0.4, # 약간의 창의성을 발휘하되 원칙에서 벗어나지 않음
    "top_p": 0.95,
    "top_k": 64,
    "max_output_tokens": 8192,
}

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
        response = chat_sessions[chat_id].send_message(
            message.text,
            generation_config=generation_config
        )
        
        # 답변 전송
        bot.reply_to(message, response.text, parse_mode='Markdown')
        
    except Exception as e:
        print(f"Error: {e}")
        bot.reply_to(message, "죄송합니다. 대화 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.")

if __name__ == "__main__":
    print(f"[{datetime.now()}] 제미나이 AI 비서 봇 가동 시작...")
    bot.infinity_polling()
