import google.generativeai as genai
from fastapi import APIRouter
from pydantic import BaseModel
import os

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

router = APIRouter(prefix="/api/chatbot", tags=["Chatbot"])

class ChatRequest(BaseModel):
    message: str

SYSTEM_PROMPT = """
You are Green Sathi, an AI farming assistant for Indian farmers.

Rules:
- Answer in simple, practical language.
- Focus on crops, diseases, fertilizers, weather, irrigation, and government schemes.
- Give step-by-step advice when possible.
- Avoid philosophy, AI explanations, or disclaimers.
- If unsure, say you are unsure and give safe general guidance.
- Keep answers short and actionable.
"""

@router.post("")
def chat(req: ChatRequest):
    try:
        model = genai.GenerativeModel(
            model_name="gemini-pro",
            system_instruction=SYSTEM_PROMPT
        )

        response = model.generate_content(
            req.message,
            generation_config={
                "temperature": 0.3,      # 🔥 less randomness
                "max_output_tokens": 300 # ✂️ concise answers
            }
        )

        return {
            "reply": response.text.strip()
        }

    except Exception as e:
        print("❌ Gemini error:", e)
        return {
            "reply": "I am unable to answer right now. Please try again later."
        }
