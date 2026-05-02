import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY", "")
genai.configure(api_key=GEMINI_API_KEY)

try:
    model = genai.GenerativeModel('gemini-3-flash-preview')
    response = model.generate_content("Hello, are you working?")
    print(f"SUCCESS (gemini-3-flash-preview): {response.text}")
except Exception as e:
    print(f"FAILED (gemini-3-flash-preview): {e}")
