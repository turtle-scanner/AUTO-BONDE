import sqlite3
import os
import hashlib
import re

base_dir = r"g:\내 드라이브\ANTI GRAVITY\자동매매설정\web_app"
db_path = os.path.join(base_dir, 'trading_platform.db')

def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

# 1. Update DB for cntfed
conn = sqlite3.connect(db_path)
cursor = conn.cursor()
hashed_pw = hash_password("cntfed")
cursor.execute("SELECT * FROM users WHERE username='cntfed'")
if not cursor.fetchone():
    cursor.execute("INSERT INTO users (email, username, password_hash, role_level) VALUES (?, ?, ?, ?)",
                   ('cntfed@dragonfly.com', 'cntfed', hashed_pw, 7))
else:
    cursor.execute("UPDATE users SET password_hash=?, role_level=? WHERE username='cntfed'", (hashed_pw, 7))

# Also fix the default admin
admin_hashed = hash_password("1234")
cursor.execute("UPDATE users SET password_hash=? WHERE username='admin'", (admin_hashed,))

conn.commit()
conn.close()

# 2. Update main.py for username/email login
main_py_path = os.path.join(base_dir, 'main.py')
with open(main_py_path, 'r', encoding='utf-8') as f:
    main_code = f.read()

# Update LoginRequest schema to take username instead of email
main_code = re.sub(r"class LoginRequest\(BaseModel\):\n\s+email: str", "class LoginRequest(BaseModel):\n    username: str", main_code)

# Update the login sql query
old_sql = 'WHERE u.email = ? AND u.password_hash = ?\\n      """, (req.email, hashed_pw))'
new_sql = 'WHERE (u.username = ? OR u.email = ?) AND u.password_hash = ?\\n      """, (req.username, req.username, hashed_pw))'
main_code = main_code.replace(old_sql, new_sql)

# Fallback replace using regex
main_code = re.sub(r'WHERE u\.email = \? AND u\.password_hash = \?\s*""", \(req\.email, hashed_pw\)\)', 'WHERE (u.username = ? OR u.email = ?) AND u.password_hash = ?\\n      """, (req.username, req.username, hashed_pw))', main_code)

with open(main_py_path, 'w', encoding='utf-8') as f:
    f.write(main_code)

# 3. Update index.html texts and inputs
index_path = os.path.join(base_dir, 'index.html')
with open(index_path, 'r', encoding='utf-8') as f:
    index_code = f.read()

index_code = index_code.replace('Welcome Back', 'DRAGONFLY Login')
index_code = index_code.replace('ANTI GRAVITY 자동매매 플랫폼에 로그인하세요', 'DRAGONFLY 주식 정보 웹에 로그인하세요')
index_code = index_code.replace('Join ANTI GRAVITY', 'Join DRAGONFLY')
index_code = index_code.replace('다수의 회원이 이용하는 프리미엄 퀀트 플랫폼', 'DRAGONFLY 주식 정보 웹에 가입하세요')

# Change email input to text for login
index_code = index_code.replace('<input type="email" required>', '<input type="text" required>')
index_code = index_code.replace('<label>이메일</label>', '<label>사령부 아이디</label>')

with open(index_path, 'w', encoding='utf-8') as f:
    f.write(index_code)

# 4. Clean up script.js and update payload
script_path = os.path.join(base_dir, 'script.js')
with open(script_path, 'r', encoding='utf-8') as f:
    script_lines = f.read().splitlines()

# Clean duplicate heatmap blocks
clean_lines = []
heatmap_count = 0
for line in script_lines:
    if '// --- 히트맵 데이터 로직 ---' in line:
        heatmap_count += 1
        if heatmap_count > 1:
            break
    clean_lines.append(line)

script_code = '\\n'.join(clean_lines)

# Fix script if it ends abruptly
if not script_code.strip().endswith('});'):
    script_code += '\\n});'

# Update login payload
script_code = script_code.replace('const email = inputs[0].value;', 'const username = inputs[0].value;')
script_code = script_code.replace('JSON.stringify({ email, password })', 'JSON.stringify({ username, password })')

with open(script_path, 'w', encoding='utf-8') as f:
    f.write(script_code)

print("Patch successful.")
