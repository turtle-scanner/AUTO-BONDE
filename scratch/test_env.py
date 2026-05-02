import os
from dotenv import load_dotenv
print("Loading .env...")
load_dotenv()
print(".env loaded.")
import google.generativeai as genai
print("GenAI imported.")
import telebot
print("Telebot imported.")
import emoji
print("Emoji imported.")
print("Success!")
