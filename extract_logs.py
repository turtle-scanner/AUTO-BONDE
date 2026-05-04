
import json
import os

log_path = r'C:\Users\LENOVO\.gemini\antigravity\brain\f6e1dab0-6bd4-4096-b846-ef4a0c57ea6c\.system_generated\logs\overview.txt'

with open(log_path, 'r', encoding='utf-8') as f:
    for line in f:
        try:
            data = json.loads(line)
            if 'tool_calls' in data:
                for tc in data['tool_calls']:
                    if tc['name'] in ['write_to_file', 'replace_file_content', 'multi_replace_file_content'] and 'Sidebar.tsx' in str(tc['args'].get('TargetFile')):
                        print(f"Step: {data.get('step_index')} Time: {data.get('created_at')}")
                        print(json.dumps(tc['args'], indent=2, ensure_ascii=False))
        except:
            continue
