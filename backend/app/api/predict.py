from fastapi import APIRouter, UploadFile, File, Form
from app.ml.inference import run_model
from app.services.groq_service import get_disease_context
from app.services.weather_service import get_weather

router = APIRouter()

@router.post("/predict")
async def predict(
    image: UploadFile = File(...),
    state: str = Form(...),
    district: str = Form(...),
    language: str = Form("en")
):
    image_bytes = await image.read()

    # 1️⃣ ML MODEL (SOURCE OF TRUTH)
    model_prediction = run_model(image_bytes)

    if not model_prediction or "disease" not in model_prediction:
        return {
            "state": state,
            "district": district,
            "language": language,
            "error": "Model failed to predict disease"
        }

    # 2️⃣ GROQ LLM (EXPLANATION ONLY)
    ai_analysis = get_disease_context(
        crop=model_prediction["crop"],
        disease=model_prediction["disease"],
        state=state,
        district=district,
        language=language
    )

    # 3️⃣ WEATHER
    weather = get_weather(district)

    return {
        "state": state,
        "district": district,
        "language": language,

        "model_prediction": model_prediction,
        "ai_analysis": ai_analysis,
        "weather": weather
    }
