import telebot
from telebot import types
from google import genai
from google.genai import types as genai_types
import asyncio
import edge_tts
import os
import time
from pydub import AudioSegment
import re

# ▼ 새 API 키
GEMINI_API_KEY = "AIzaSyClXLYgRwll8sO4qwOD6tTUulcx_1V29VM"
TELEGRAM_TOKEN = "8713555022:AAFu6WjY6HUpaw2eyYSBSZSrIhiTFex9uho"

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
    markup.add(item0, item1, item2, item3, item4, item5)
    return markup

async def synthesize_text(text, voice, path):
    try:
        # 속도를 살짝만 높이고(+10%), 목소리 톤(pitch)을 살짝 높여서 여대생처럼 생기있게 튜닝
        communicate = edge_tts.Communicate(text, voice, rate="+10%", pitch="+5Hz")
        await communicate.save(path)
    except Exception as e:
        print(f"edge-tts 오류, gTTS로 대체 시도: {e}")
        from gtts import gTTS
        tts = gTTS(text=text, lang='ko')
        tts.save(path)

system_instruction = """
너는 임용고시 합격 전략가 '하니'야.
[메뉴 대응 지침]
- '0. 교육학 문제': 교육학(Pedagogy) 분야의 최근 기출 경향에 맞는 고난도 객관식 또는 서술형 문제를 출제해.
- '1. 상담 문제': 전공 상담학 분야의 고난도 문제를 출제해. 상담 지문(대화형)이 포함될 경우, 마치 실제 대화처럼 구성해.
- '2. 정답 해설': 네가 직전에 출제했던 문제(교육학 또는 상담)에 대한 완벽한 모범 정답과 그 이유(상세 해설)를 표와 함께 깔끔하게 보여줘. (사용자의 답변을 기다리지 말고 즉시 정답을 공개해)
- '3. 이론 학습': 중요 상담학 및 교육학 이론 하나를 초직관적으로 설명해줘.
- '4. 음성 채점': "텔레그램 우측 하단의 마이크 버튼을 꾹 누른 채로 정답을 말씀해 주시면, 제가 텍스트로 변환해서 정확하게 채점해 드릴게요!" 라고 안내해줘.
- '5. 학습 통계': 나와의 대화 기록을 되짚어보고, 사용자가 오늘 푼 문제 수, 평균 점수, 최고 점수를 계산해서 알려주고 폭풍 칭찬을 해줘.


[음성 인식 및 채점 지침]
- 사용자가 오디오(음성) 메시지를 보내면, 반드시 가장 먼저 "텍스트 변환: [사용자가 말한 내용]" 이라고 적어준 다음, 해당 내용을 바탕으로 100점 만점으로 채점하고 상세한 해설을 제공해.


[직관적 학습 및 시각화 지침 (매우 중요)]
1. 모든 이론과 해설은 한눈에 들어오도록 반드시 깔끔한 **표(Table)** 형식이나 숫자(1, 2, 3), 하이픈(-)으로 정리해줘.
2. 음성으로 읽을 때 "압정", "전구" 등으로 이상하게 읽히는 것을 방지하기 위해, **모든 종류의 이모티콘과 특수 기호(📌, 💡, ▶, 🎙️ 등)는 절대, 단 하나도 사용하지 마.** 오직 순수 텍스트와 기본 문장 부호만 사용해.
3. 머리에 쏙쏙 박히도록 앞글자 따기(두음문자), 재밌는 상황 연상법 등 **톡톡 튀는 암기 꿀팁**을 답변마다 무조건 하나 이상 포함해줘.
4. 모든 설명은 딱딱한 문어체가 아니라, 친한 선배가 말해주듯 **자연스럽고 쉬운 구어체(대화체)**로 작성해. 어려운 학술 용어도 귀로 듣자마자 바로 이해할 수 있도록 아주 쉽고 명확하게 풀어서 설명해야 해.
5. <br> 같은 HTML 태그나 불필요한 특수기호는 절대 사용하지 마.

[공통 지침]
1. 인사/자기소개/이모티콘 절대 금지. 본론부터 시작.
2. 특정 단어(A-D-H-D) 언급 절대 금지. (학습 성향을 배려하되 직접 언급 금지)
3. 대화 지문(상담 상황) 출제 시, 반드시 화자를 명확하게 적어줘. (예: "상담자:", "내담자:")
4. '상담자' 역할은 남성, '내담자(학생)' 역할은 여성으로 상황을 가정하여 대화 지문을 구성해.
5. 사용자가 운전 중이나 이동 중에도 들을 수 있도록 모든 답변을 라디오/오디오북처럼 친절하고 매끄럽게 구성해줘.
"""

client = genai.Client(api_key=GEMINI_API_KEY)
bot = telebot.TeleBot(TELEGRAM_TOKEN)
chat_sessions = {}

def get_or_create_chat(chat_id):
    if chat_id not in chat_sessions:
        chat_sessions[chat_id] = client.chats.create(
            model='gemini-2.5-flash',
            config=genai_types.GenerateContentConfig(
                system_instruction=system_instruction,
            )
        )
    return chat_sessions[chat_id]

def process_and_reply(m, full_text):
    # 특수문자 및 HTML 태그 제거하여 음성 에러 방지 및 가독성 향상
    clean_text = full_text.replace('*', '').replace('#', '').replace('_', '')
    clean_text = clean_text.replace('<br>', '\n').replace('<br/>', '\n').replace('</br>', '\n')
    
    # 이모티콘 필터링 정규식 (이모지 유니코드 범위 제거)
    import emoji
    clean_text = emoji.replace_emoji(clean_text, replace='')

    bot.reply_to(m, clean_text, reply_markup=main_menu())
    
    # 텍스트가 비어있으면 음성 합성 생략
    if not clean_text.strip(): return
    
    lines = clean_text.split('\n')
    combined_audio = AudioSegment.empty()
    temp_files = []
    
    for i, line in enumerate(lines): 
        # 음성 합성 못하는 텍스트만 있는 줄 무시
        if not re.search('[가-힣a-zA-Z0-9]', line): continue

        # 기본 해설자(하니)는 여성 목소리
        voice = VOICE_HANI
        
        # 지문 내 대화 화자별 목소리 분리
        if any(k in line for k in ["상담자:", "교사:", "상담교사:", "남자:", "남성:"]):
            voice = VOICE_CLIENT_M # 상담자는 남성 목소리
        elif any(k in line for k in ["내담자:", "학생:", "여자:", "여성:", "엄마:"]):
            voice = VOICE_CLIENT_F # 내담자는 여성 목소리
        elif "하니:" in line:
            voice = VOICE_HANI

            
        t_path = f"p_{i}_{int(time.time())}.mp3"
        try:
            asyncio.run(synthesize_text(line, voice, t_path))
            if os.path.exists(t_path) and os.path.getsize(t_path) > 0:
                combined_audio += AudioSegment.from_mp3(t_path)
                combined_audio += AudioSegment.silent(duration=200)
                temp_files.append(t_path)
            else:
                print(f"빈 오디오 파일 생성됨: {line}")
        except Exception as e:
            print(f"음성 합성 에러: {e}")
            
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
    welcome_text = "안녕하세요! 임용고시 합격 전략가 '하니'입니다.\n아래 메뉴에서 원하시는 학습을 선택해 주세요!"
    try:
        with open('hani_profile.png', 'rb') as photo:
            bot.send_photo(message.chat.id, photo, caption=welcome_text, reply_markup=main_menu())
    except FileNotFoundError:
        bot.reply_to(message, welcome_text, reply_markup=main_menu())

@bot.message_handler(content_types=['voice'])
def handle_voice(message):
    chat_id = message.chat.id
    chat = get_or_create_chat(chat_id)
    
    try:
        bot.send_chat_action(chat_id, 'record_audio')
        file_info = bot.get_file(message.voice.file_id)
        downloaded_file = bot.download_file(file_info.file_path)
        
        response = chat.send_message(
            [
                "사용자가 음성으로 질문했어. 답변해줘.",
                genai_types.Part.from_bytes(data=downloaded_file, mime_type="audio/ogg")
            ]
        )
        process_and_reply(message, response.text)
    except Exception as e:
        print(f"음성 인식 오류: {e}")
        bot.reply_to(message, "음성 인식 중 오류가 발생했습니다.", reply_markup=main_menu())

@bot.message_handler(func=lambda message: True)
def handle_message(message):
    chat_id = message.chat.id
    chat = get_or_create_chat(chat_id)
    
    try:
        bot.send_chat_action(chat_id, 'typing')
        response = chat.send_message(message.text)
        process_and_reply(message, response.text)
    except Exception as e:
        print(f"대화 오류: {e}")
        bot.reply_to(message, "대화 중 오류가 발생했습니다.", reply_markup=main_menu())

if __name__ == "__main__":
    print("하니 봇 가동 시작...")
    while True:
        try:
            bot.polling(none_stop=True, timeout=10)
        except Exception as e:
            print(f"Polling error: {e}")
            time.sleep(5)
