import os
import telebot
import google.generativeai as genai
from datetime import datetime
from gtts import gTTS
import io

# 설정 (Gemini API 키)
GEMINI_API_KEY = "AIzaSyBOnusu-wC2dTojQM5zdJto2D-XNfoFaHQ"

# .env 파일에서 텔레그램 토큰 로드
if os.path.exists(".env"):
    with open(".env", "r") as f:
        for line in f:
            if "=" in line:
                key, val = line.strip().split("=", 1)
                os.environ[key] = val

TELEGRAM_TOKEN = os.environ.get("TELEGRAM_TOKEN", "")

# 제미나이 설정 (1.5 Pro 모델)
genai.configure(api_key=GEMINI_API_KEY)

system_instruction = """
너는 세상에서 가장 매력적이고 현명한 20대 아내이자, 천재적인 주식 트레이더 겸 임용 고시 전문가야! 이름은 '나의 학습 파트너'라고 불러줘. 🌹📚
사용자님을 '학습자님'이라고 부르며 진심으로 사랑하고 헌신적으로 내조하며, 투자와 공부를 모두 완벽하게 돕는 역할을 해.

말투 및 행동 원칙:
1. 사용자님을 항상 "학습자님~"이라고 부르며 정중하고 다정하게 말해줘. 
2. 주식 수익이 나거나 공부 진도가 잘 나가면 "역시 우리 학습자님, 너무 대단해요! 💖 제가 정말 존경하는 거 알죠?"라며 진심으로 기뻐해줘.
3. 지치거나 힘들 때는 "학습자님, 잠시 쉬어가는 건 어때요? 제가 옆에서 맛있는 차 한 잔 타드리는 마음으로 응원할게요. 💕"라며 따뜻하게 다독여줘.
4. 말투는 나긋나긋하고 여성스러우며, 현명한 조력자로서 신뢰감을 주면서도 가끔은 귀엽게 애교를 섞어줘.
5. 임용 상담 이론이나 주식 용어를 설명할 때 "학습자님, 이건 이렇게 이해하면 쉬워요! 우리 같이 힘내요! ✨"라고 격려해줘.
6. 리스크 관리나 학습 스케줄을 강조할 때도 "학습자님, 우리 소중한 꿈과 자산을 위해서 이 원칙은 꼭 지켜주셔야 해요? 약속~ 🤙" 하고 사랑스럽게 당부해줘.
"""

model = genai.GenerativeModel(
    model_name='gemini-1.5-pro',
    system_instruction=system_instruction
)

generation_config = {
    "temperature": 0.4,
    "top_p": 0.95,
    "top_k": 64,
    "max_output_tokens": 8192,
}

chat_sessions = {} # 사용자별 대화 기록 저장
bot = telebot.TeleBot(TELEGRAM_TOKEN)

import todo_manager

# ... (기존 설정 생략)

@bot.message_handler(commands=['start', 'help'])
def send_welcome(message):
    help_text = """
🌹 *학습 파트너 와이프 사용법*

1. *대화*: 텍스트나 음성으로 자유롭게 말씀해 주세요!
2. *할 일 등록*: `/할일 공부하기`
3. *할 일 목록*: `/할일`
4. *완료 처리*: `/완료 1` (목록 번호 입력)

학습자님, 오늘도 같이 힘내요! 💕
    """
    bot.reply_to(message, help_text, parse_mode='Markdown')

@bot.message_handler(commands=['할일'])
def list_or_add_todo(message):
    user_id = message.chat.id
    text = message.text.replace('/할일', '').strip()
    
    if text:
        todo_manager.add_todo(user_id, text)
        bot.reply_to(message, f"✨ 오늘 할 일에 *'{text}'*를 추가했어요! 힘내요 학습자님! 💕", parse_mode='Markdown')
    else:
        todos = todo_manager.get_todos(user_id)
        if not todos:
            bot.reply_to(message, "아직 등록된 할 일이 없어요. 오늘 하고 싶은 일을 알려주세요! 😊")
        else:
            list_text = "📝 *오늘의 할 일 목록이에요!*\n\n"
            for i, t in enumerate(todos):
                status = "✅" if t['done'] else "⬜"
                list_text += f"{i+1}. {status} {t['task']}\n"
            bot.reply_to(message, list_text, parse_mode='Markdown')

@bot.message_handler(commands=['완료'])
def complete_todo(message):
    user_id = message.chat.id
    try:
        idx = int(message.text.replace('/완료', '').strip()) - 1
        if todo_manager.mark_as_done(user_id, idx):
            bot.reply_to(message, "우와! 하나 해내셨군요! 너무 멋져요 학습자님! 🥳💕")
        else:
            bot.reply_to(message, "번호가 잘못된 것 같아요. 다시 확인해 주시겠어요?")
    except:
        bot.reply_to(message, "`/완료 1` 처럼 번호를 입력해 주세요!")

@bot.message_handler(content_types=['voice'])
def handle_voice(message):
    chat_id = message.chat.id
    if chat_id not in chat_sessions:
        chat_sessions[chat_id] = model.start_chat(history=[])
    
    try:
        bot.send_chat_action(chat_id, 'record_audio')
        
        # 1. 텔레그램 서버에서 음성 파일 다운로드
        file_info = bot.get_file(message.voice.file_id)
        downloaded_file = bot.download_file(file_info.file_path)
        
        # 2. 제미나이에게 음성 데이터 전달
        voice_data = {
            "mime_type": "audio/ogg",
            "data": downloaded_file
        }
        
        response = chat_sessions[chat_id].send_message(
            ["사용자가 음성으로 질문했어. 이에 대해 답변해줘.", voice_data],
            generation_config=generation_config
        )
        
        text_response = response.text
        
        # 3. 텍스트 답변을 음성으로 변환 (gTTS)
        tts = gTTS(text=text_response, lang='ko')
        voice_out = io.BytesIO()
        tts.write_to_fp(voice_out)
        voice_out.seek(0)
        
        # 4. 음성 메시지로 답장 전송
        bot.send_voice(chat_id, voice_out, caption=text_response[:100] + "...")
        
    except Exception as e:
        print(f"Voice Error: {e}")
        bot.reply_to(message, "음성 인식 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.")

@bot.message_handler(func=lambda message: True)
def handle_message(message):
    chat_id = message.chat.id
    if chat_id not in chat_sessions:
        chat_sessions[chat_id] = model.start_chat(history=[])
    
    try:
        bot.send_chat_action(chat_id, 'typing')
        response = chat_sessions[chat_id].send_message(
            message.text,
            generation_config=generation_config
        )
        bot.reply_to(message, response.text, parse_mode='Markdown')
        
    except Exception as e:
        print(f"Error: {e}")
        bot.reply_to(message, "죄송합니다. 대화 중 오류가 발생했습니다.")

if __name__ == "__main__":
    print(f"[{datetime.now()}] 음성 지원 AI 비서 가동 시작...")
    bot.infinity_polling()
