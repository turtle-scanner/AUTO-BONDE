import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY", "")
genai.configure(api_key=GEMINI_API_KEY)

try:
    model = genai.GenerativeModel('gemini-1.5-flash') # Try flash first
    response = model.generate_content("Hello, are you working?")
    print(f"SUCCESS (flash): {response.text}")
except Exception as e:
    print(f"FAILED (flash): {e}")

try:
    model = genai.GenerativeModel('gemini-1.5-pro')
    response = model.generate_content("Hello, are you working?")
    print(f"SUCCESS (pro): {response.text}")
except Exception as e:
    print(f"FAILED (pro): {e}")
