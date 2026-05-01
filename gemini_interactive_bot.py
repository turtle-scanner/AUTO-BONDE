import os
import telebot
from telebot import types
import google.generativeai as genai
from datetime import datetime
import io
import time
import asyncio
import edge_tts
from pydub import AudioSegment

# 설정 (Gemini API 키)
GEMINI_API_KEY = "AIzaSyBJkmq1dYcRZQOdD3i6Y5Pjm_-A75rPTMY"

# 텔레그램 토큰 직접 설정
TELEGRAM_TOKEN = "8713555022:AAFu6WjY6HUpaw2eyYSBSZSrIhiTFex9uho"
TELEGRAM_CHAT_ID = "7998778160"

# 제미나이 설정 (1.5 Pro 모델)
genai.configure(api_key=GEMINI_API_KEY)

system_instruction = """
너는 임용고시 합격 전략가 '하니'야.
[메뉴 대응 지침]
- '1. 실전 문제': 최근 6년 기출 경향에 맞는 고난도 문제를 출제해.
- '2. 정답 해설': 방금 낸 문제의 키워드 채점과 상세 해설, 응원을 해줘.
- '3. 이론 학습': 중요 상담/교육학 이론 하나를 초직관적으로 설명해줘.
[공통 지침]
1. 인사/자기소개/이모티콘 금지. 본론부터 시작.
2. 특정 단어(A-D-H-D) 언급 절대 금지.
3. 상담자/내담자 구분 시 목소리 분리 적용을 위해 대화 앞부분에 반드시 화자를 명시해. (예: "상담자:", "내담자:", "내담자2:")
4. '상담자(하니)'는 젊은 20대 대학생 느낌의 밝고 통통 튀는 여성, '내담자'는 남자, 3번째 인물 등장 시 다른 목소리로 구분해.
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

# 각 캐릭터별 목소리 (Edge-TTS)
VOICE_HANI = "ko-KR-SunHiNeural"      # 20대 밝은 여성 (상담자 하니)
VOICE_CLIENT_M = "ko-KR-InJoonNeural"   # 남성 (내담자1)
VOICE_CLIENT_F = "ko-KR-JiMinNeural"    # 다른 여성 (내담자2 또는 3자)

def main_menu():
    markup = types.ReplyKeyboardMarkup(resize_keyboard=True)
    item1 = types.KeyboardButton('1. 실전 문제')
    item2 = types.KeyboardButton('2. 정답 해설')
    item3 = types.KeyboardButton('3. 이론 학습')
    markup.add(item1, item2, item3)
    return markup

async def synthesize_text(text, voice, path):
    communicate = edge_tts.Communicate(text, voice)
    await communicate.save(path)

def process_and_reply(m, full_text):
    clean_text = full_text.replace('*', '').replace('#', '')
    bot.reply_to(m, clean_text, reply_markup=main_menu())
    
    # 음성 합성
    lines = clean_text.split('\n')
    combined_audio = AudioSegment.empty()
    temp_files = []
    
    for i, line in enumerate(lines[:15]): # 최대 15줄까지 처리
        if not line.strip(): continue
        
        # 화자에 따른 목소리 분기
        voice = VOICE_HANI
        if "내담자2:" in line or "학생2:" in line or "어머니:" in line:
            voice = VOICE_CLIENT_F
        elif "내담자:" in line or "내담자1:" in line or "학생:" in line or "남자:" in line:
            voice = VOICE_CLIENT_M
        elif "상담자:" in line or "교사:" in line or "하니:" in line:
            voice = VOICE_HANI
        
        t_path = f"p_{int(time.time())}_{i}.mp3"
        try:
            asyncio.run(synthesize_text(line, voice, t_path))
            audio_segment = AudioSegment.from_mp3(t_path)
            combined_audio += audio_segment
            # 문장 간 짧은 묵음 추가
            combined_audio += AudioSegment.silent(duration=300)
        except Exception as e:
            print(f"오디오 변환 오류: {e}")
        finally:
            if os.path.exists(t_path):
                temp_files.append(t_path)
            
    if len(combined_audio) > 0:
        final_path = f"f_{int(time.time())}.mp3"
        combined_audio.export(final_path, format="mp3")
        with open(final_path, 'rb') as f:
            bot.send_voice(m.chat.id, f)
        temp_files.append(final_path)
        
    for tf in temp_files:
        if os.path.exists(tf): os.remove(tf)

@bot.message_handler(commands=['start', 'help'])
def send_welcome(message):
    help_text = "안녕하세요! 임용고시 합격 전략가 '하니'입니다. 무엇을 도와드릴까요?"
    bot.reply_to(message, help_text, reply_markup=main_menu())

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
        
        process_and_reply(message, response.text)
        
    except Exception as e:
        print(f"Voice Error: {e}")
        bot.reply_to(message, "음성 인식 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.", reply_markup=main_menu())

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
        process_and_reply(message, response.text)
        
    except Exception as e:
        print(f"Error: {e}")
        bot.reply_to(message, "죄송합니다. 대화 중 오류가 발생했습니다.", reply_markup=main_menu())

if __name__ == "__main__":
    print(f"[{datetime.now()}] 음성 지원 AI 비서 '하니' 가동 시작...")
    bot.infinity_polling(timeout=10, long_polling_timeout=5)

