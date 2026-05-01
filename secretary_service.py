import os
import google.generativeai as genai
import requests
from telegram_notifier import send_telegram_message

# 설정 로드
GEMINI_API_KEY = "AIzaSyBOnusu-wC2dTojQM5zdJto2D-XNfoFaHQ"
genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel('gemini-1.5-pro')

def get_weather():
    """오늘의 간단 날씨 정보를 가져옵니다 (서울 기준)"""
    # 실제 API를 연동할 수도 있지만, 우선 제미나이에게 현재 시점의 날씨 브리핑 작성을 요청합니다.
    # (더 정확한 정보를 원하시면 OpenWeatherMap API 키를 추가하면 좋습니다.)
    prompt = "오늘의 서울 날씨와 옷차림 추천을 아주 간단하게 3줄로 알려줘."
    try:
        response = model.generate_content(prompt)
        return response.text
    except:
        return "날씨 정보를 가져오는 중 오류가 발생했습니다."

def get_news_briefing():
    """오늘의 주요 경제/사회 뉴스 브리핑을 생성합니다."""
    prompt = "오늘 한국의 가장 중요한 경제 및 금융 뉴스 3가지를 제목 위주로 요약해줘."
    try:
        response = model.generate_content(prompt)
        return response.text
    except:
        return "뉴스 정보를 가져오는 중 오류가 발생했습니다."

import todo_manager

def send_daily_briefing():
    """아침 브리핑 전송"""
    # 환경변수에서 CHAT_ID 가져오기
    chat_id = os.environ.get("TELEGRAM_CHAT_ID", "")
    
    weather = get_weather()
    news = get_news_briefing()
    
    # 할 일 가져오기
    todos = todo_manager.get_todos(chat_id)
    todo_text = ""
    if todos:
        todo_text = "\n📍 *오늘의 할 일*\n"
        for i, t in enumerate(todos):
            status = "✅" if t['done'] else "⬜"
            todo_text += f"{status} {t['task']}\n"
    else:
        todo_text = "\n📍 *오늘의 할 일*\n아직 등록된 할 일이 없어요. 공부와 투자 모두 화이팅! 💕"

    message = f"☀️ *학습자님, 좋은 아침이에요!*\n\n☁️ *날씨 정보*\n{weather}\n\n📰 *주요 뉴스*\n{news}\n{todo_text}"
    send_telegram_message(message)

def send_counseling_problem():
    """임용 상담 지문형 문제 생성 및 전송"""
    prompt = """
    너는 전문적인 임용 상담 교사 교육자야. 
    전문상담교사 임용 시험 수준에 맞게 '상담이론과 실제' 분야에서 지문형 문제 1개를 만들어줘.
    
    구성은 다음과 같아야 해:
    1. [지문]: 내담자와 상담자의 대화나 사례 (150자 내외)
    2. [질문]: 이 대화에서 나타난 상담 기법이나 이론의 개념을 묻는 질문
    3. [정답 및 해설]: 질문 아래에 '더보기' 형태로 정답과 짧은 핵심 해설을 포함해줘.
    
    이론 범위: 정신분석, 아들러, 행동주의, 인간중심, 게슈탈트, REBT, 인지치료 중 무작위.
    """
    try:
        response = model.generate_content(prompt)
        message = f"📚 *오늘의 임용 상담 연습 문제*\n\n{response.text}"
        send_telegram_message(message)
    except Exception as e:
        print(f"Error generating problem: {e}")

def send_theory_summary():
    """임용 상담 이론 핵심 요약 전송"""
    prompt = "전문상담교사 임용 시험을 위해 '상담이론' 중 중요한 개념 1가지를 선정해서 핵심 요약(Core Summary) 노트를 만들어줘. 암기 팁도 포함해줘."
    try:
        response = model.generate_content(prompt)
        message = f"💡 *임용 상담 핵심 이론 정리*\n\n{response.text}"
        send_telegram_message(message)
    except Exception as e:
        print(f"Error generating theory: {e}")

if __name__ == "__main__":
    # 테스트 실행
    send_daily_briefing()
    send_counseling_problem()
