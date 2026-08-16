import os
import json
from dotenv import load_dotenv
from groq import Groq

# Load environment variables
load_dotenv()

# Initialize Groq client
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
        model="llama-3.3-70b-versatile",
        messages=[
            {"role": "system", "content": "Return only valid JSON. No explanations."},
            {"role": "user", "content": prompt},
        ],
        temperature=0.2,
    )

    # Get raw content
    content = response.choices[0].message.content
    print("AI RAW RESPONSE:", content)

    # If AI returns nothing
    if not content or content.strip() == "":
        return {
            "prediction": {
                "severity": "unknown",
                "recovery_days": 0,
                "explanation": "AI returned empty response"
            },
            "soil": {},
            "treatment": {},
            "environment": {},
            "advisory": {}
        }

    # Remove markdown formatting
    content = content.strip()

    if content.startswith("```"):
        content = content.replace("```json", "").replace("```", "")

    try:
        # Extract JSON safely
        start = content.find("{")
        end = content.rfind("}") + 1
        json_text = content[start:end]

        return json.loads(json_text)

    except Exception as e:
        print("JSON PARSE ERROR:", e)
        print("FAILED RESPONSE:", content)

        return {
            "prediction": {
                "severity": "unknown",
                "recovery_days": 0,
                "explanation": "AI response parsing failed"
            },
            "soil": {},
            "treatment": {},
            "environment": {},
            "advisory": {}
        }