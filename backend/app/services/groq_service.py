import os, json
from groq import Groq

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def get_disease_context(
    crop: str,
    disease: str,
    state: str,
    district: str,
    language: str = "en"
):
    prompt = f"""
Return ONLY valid JSON.

Crop: {crop}
Disease: {disease}
State: {state}
District: {district}
Language: {language}

Include:
- prediction (severity, recovery_days, explanation)
- soil (type, fertility, npk)
- treatment (product, dosage, method)
- environment (industrial_hazards, geography)
- advisory (precautions, safety)
"""

    response = client.chat.completions.create(
        model="openai/gpt-oss-120b",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.2,
    )

    return json.loads(response.choices[0].message.content)
