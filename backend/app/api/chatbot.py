from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

router = APIRouter(prefix="/chatbot", tags=["Chatbot"])

class ChatRequest(BaseModel):

    message: str

@router.post("/")

def chat(req: ChatRequest):
    try:
        model = genai.GenerativeModel(
            model_name="models/gemini-2.5-flash",
            generation_config={
                "temperature": 0.25,
                "max_output_tokens": 600,
                "top_p": 0.9
            }
        )

        response = model.generate_content(
            contents=[
                {
                    "role": "user",
                    "parts": [{"text": req.message}]
                }
            ]
        )

        return {
            "reply": response.text
        }
    except Exception as e:
        print("❌ Gemini error:", e)
        raise HTTPException(status_code=500, detail="Chatbot failed")