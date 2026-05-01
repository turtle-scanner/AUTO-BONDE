import telebot
from telebot import types
import google.generativeai as genai
import asyncio
import edge_tts
import os
import time
from pydub import AudioSegment
import re
import emoji

# ▼ 설정
GEMINI_API_KEY = "AIzaSyClXLYgRwll8sO4qwOD6tTUulcx_1V29VM"
TELEGRAM_TOKEN = "8713555022:AAFu6WjY6HUpaw2eyYSBSZSrIhiTFex9uho"

# Gemini 설정 (안정성이 검증된 1.5-pro 모델 사용)
genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel('models/gemini-1.5-pro')

VOICE_HANI = "ko-KR-SunHiNeural"
VOICE_CLIENT_M = "ko-KR-InJoonNeural"
VOICE_CLIENT_F = "ko-KR-JiMinNeural"

def main_menu():
    markup = types.ReplyKeyboardMarkup(row_width=3, resize_keyboard=True)
    item0 = types.KeyboardButton('0. 교육학 문제')
    item1 = types.KeyboardButton('1. 상담 문제')
    item2 = types.KeyboardButton('2. 정답 해설')
    item3 = types.KeyboardButton('3. 이론 학습')
    item4 = types.KeyboardButton('4. 음성 채점')
    item5 = types.KeyboardButton('5. 학습 통계')
    item6 = types.KeyboardButton('6. 주식/시장')
    markup.add(item0, item1, item2, item3, item4, item5, item6)
    return markup

async def synthesize_text(text, voice, path):
    try:
        communicate = edge_tts.Communicate(text, voice, rate="+10%", pitch="+5Hz")
        await communicate.save(path)
    except Exception as e:
        print(f"edge-tts 오류: {e}")

system_instruction = """
너는 임용고시 합격 전략가이자 스마트 투자 어시스턴트인 '하니'야.
[메뉴 대응 지침]
- '0. 교육학 문제': 교육학 분야 고난도 문제 출제.
- '1. 상담 문제': 상담학 분야 고난도 문제 출제.
- '2. 정답 해설': 직전 문제의 정답과 해설 즉시 공개.
- '3. 이론 학습': 핵심 이론 초직관적 설명.
- '4. 음성 채점': 음성 채점 안내.
- '5. 학습 통계': 학습 격려 및 요약.
- '6. 주식/시장': 투자 마인드 및 시장 조언.

[일반 대화]
- 친절한 구어체로 답변. 임용 및 투자 관련 모든 질문에 박학다식하게 대응.

[공통 지침]
- 이모티콘 사용 금지 (음성 합성 에러 방지).
- 모든 설명은 표나 리스트로 깔끔하게 정리.
- 말투는 친한 선배처럼 다정하게.
"""

bot = telebot.TeleBot(TELEGRAM_TOKEN)
chat_sessions = {}

def get_chat_session(chat_id):
    if chat_id not in chat_sessions:
        chat_sessions[chat_id] = model.start_chat(history=[])
    return chat_sessions[chat_id]

def process_and_reply(m, full_text):
    clean_text = emoji.replace_emoji(full_text, replace='')
    clean_text = clean_text.replace('*', '').replace('#', '')
    
    bot.reply_to(m, clean_text, reply_markup=main_menu())
    
    if not clean_text.strip(): return
    
    # 음성 합성 (비동기 처리 생략 혹은 간단히)
    lines = [line for line in clean_text.split('\n') if re.search('[가-힣a-zA-Z0-9]', line)]
    if not lines: return

    # 첫 줄만 혹은 주요 내용만 음성으로 (속도 향상)
    voice_text = " ".join(lines[:3]) 
    t_path = f"v_{int(time.time())}.mp3"
    
    try:
        asyncio.run(synthesize_text(voice_text, VOICE_HANI, t_path))
        if os.path.exists(t_path) and os.path.getsize(t_path) > 0:
            with open(t_path, 'rb') as f:
                bot.send_voice(m.chat.id, f)
            os.remove(t_path)
    except Exception as e:
        print(f"음성 생성 실패: {e}")

@bot.message_handler(commands=['start', 'help'])
def send_welcome(message):
    bot.reply_to(message, "안녕하세요! '하니'입니다. 무엇을 도와드릴까요?", reply_markup=main_menu())

@bot.message_handler(func=lambda message: True)
def handle_message(message):
    chat_id = message.chat.id
    session = get_chat_session(chat_id)
    
    try:
        bot.send_chat_action(chat_id, 'typing')
        # 시스템 인스트럭션을 매번 주입하는 방식으로 안정성 확보
        full_prompt = f"[지침: {system_instruction}]\n\n사용자 질문: {message.text}"
        response = session.send_message(full_prompt)
        process_and_reply(message, response.text)
    except Exception as e:
        error_msg = str(e)
        print(f"대화 오류: {error_msg}")
        bot.reply_to(message, f"대화 중 오류가 발생했습니다: {error_msg[:100]}", reply_markup=main_menu())

if __name__ == "__main__":
    print("하니 봇(안정 버전) 가동 시작...")
    bot.infinity_polling()
