import os
from dotenv import load_dotenv

load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
WEATHER_API_KEY = os.getenv("OPENWEATHER_API_KEY") or os.getenv("WEATHER_API_KEY")

if not GROQ_API_KEY:
    raise RuntimeError("GROQ_API_KEY missing")

if not WEATHER_API_KEY:
    raise RuntimeError("OPENWEATHER_API_KEY missing")
