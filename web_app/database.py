import sqlite3
import os

DB_PATH = os.path.join(os.path.dirname(__file__), 'trading_platform.db')

def init_db():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    # 회원 등급(Role) 테이블 생성
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS roles (
        level INTEGER PRIMARY KEY,
        role_name TEXT UNIQUE NOT NULL,
        max_limit INTEGER -- 인원 제한 (NULL이면 무제한)
    )
    ''')

    # 사용자(User) 테이블 생성
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS users (
        user_id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        username TEXT NOT NULL,
        password_hash TEXT NOT NULL,
        role_level INTEGER DEFAULT 1,
        kis_app_key TEXT,
        kis_app_secret TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (role_level) REFERENCES roles (level)
    )
    ''')

    # 7단계 등급 데이터 삽입
    roles_data = [
        (7, '관리자', 3),
        (6, '고수등급', 10),
        (5, '중고수', 20),
        (4, '방장', None),
        (3, '실력자(초급)', None),
        (2, '입문자(초보)', None),
        (1, '방문자', None)
    ]

    cursor.executemany('''
    INSERT OR IGNORE INTO roles (level, role_name, max_limit)
    VALUES (?, ?, ?)
    ''', roles_data)

    conn.commit()
    
    # 설정된 등급 시스템 출력
    cursor.execute('SELECT level, role_name, max_limit FROM roles ORDER BY level DESC')
    rows = cursor.fetchall()
    print("========================================")
    print("[ANTI GRAVITY] 7단계 회원 등급 DB 구축 완료")
    print("========================================")
    for row in rows:
        limit_str = f"{row[2]}명 제한" if row[2] else "무제한"
        print(f"[LV.{row[0]}] {row[1]} : {limit_str}")
    print("========================================")

    conn.close()

if __name__ == '__main__':
    init_db()
