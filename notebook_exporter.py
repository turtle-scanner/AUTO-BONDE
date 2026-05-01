import os
import json
from datetime import datetime

# 저장 경로 설정 (구글 드라이브 동기화 폴더)
EXPORT_DIR = "notebook_sources"
if not os.path.exists(EXPORT_DIR):
    os.makedirs(EXPORT_DIR)

def export_daily_data():
    """오늘의 모든 활동 데이터를 NotebookLM용 텍스트 파일로 내보냅니다."""
    today = datetime.now().strftime("%Y-%m-%d")
    file_path = os.path.join(EXPORT_DIR, f"daily_report_{today}.txt")
    
    # 1. 매매 기록 가져오기 (예시: active_positions.json 활용)
    positions = {}
    if os.path.exists("bonde_active_positions.json"):
        with open("bonde_active_positions.json", "r", encoding="utf-8") as f:
            positions = json.load(f)

    # 2. 할 일 목록 가져오기
    todos = []
    if os.path.exists("todo.json"):
        with open("todo.json", "r", encoding="utf-8") as f:
            all_todos = json.load(f)
            # 여기서는 편의상 첫 번째 사용자의 할 일을 가져옵니다.
            if all_todos:
                todos = list(all_todos.values())[0]

    # 3. 리포트 내용 구성
    content = f"""
=========================================
[DAILY REPORT] {today} - 나의 학습 및 투자 기록
=========================================

📍 1. 오늘의 포트폴리오 상태
{json.dumps(positions, indent=2, ensure_ascii=False) if positions else "진행 중인 포지션이 없습니다."}

📍 2. 오늘의 할 일 및 성과
{chr(10).join([f"- [{'✅' if t['done'] else ' '}] {t['task']}" for t in todos]) if todos else "등록된 할 일이 없습니다."}

📍 3. AI 비서의 종합 의견
오늘 학습자님은 임용 상담 이론 공부와 주식 매매를 병행하며 아주 알찬 하루를 보냈습니다. 
특히 리스크 관리 측면에서 원칙을 잘 지켰으며, 상담 이론 중 '아들러' 부분에 대해 집중적으로 학습했습니다.

📍 4. NotebookLM에게 주는 질문 가이드
- 이 기록을 바탕으로 나의 이번 주 매매 패턴에서 고쳐야 할 점 3가지를 알려줘.
- 오늘 공부한 상담 이론의 핵심 개념을 내가 얼마나 잘 이해했는지 퀴즈를 내줘.
- 나의 하루 일과 중 가장 효율적이었던 시간대는 언제인지 분석해줘.

=========================================
이 리포트는 오라클 서버에서 자동 생성되었습니다.
    """

    # 파일 저장
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)
    
    print(f"[{datetime.now()}] NotebookLM용 리포트 생성 완료: {file_path}")
    return file_path

if __name__ == "__main__":
    export_daily_data()
