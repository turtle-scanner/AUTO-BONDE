import os

file_path = "full_terminal_app_v5.5_Integrated_Final.py"
try:
    # Try reading with utf-8-sig (common for Korean Windows env)
    with open(file_path, "r", encoding="utf-8-sig") as f:
        content = f.read()
except Exception as e:
    print(f"Failed with utf-8-sig: {e}")
    try:
        # Try cp949 if utf-8-sig fails
        with open(file_path, "r", encoding="cp949") as f:
            content = f.read()
    except Exception as e:
        print(f"Failed with cp949: {e}")
        exit(1)

# Clean up broken characters if any (this is a heuristic)
# If the file was already corrupted with '?', we might need to restore from a backup or previous commit.
# But let's first try to save it as clean utf-8.
with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("File encoding converted to clean utf-8.")
