import os
import requests

API_KEY = os.getenv("OPENWEATHER_API_KEY")

def get_weather(district: str):
    try:
        # 🌦 Weather
        weather_url = "https://api.openweathermap.org/data/2.5/weather"
        weather_params = {
            "q": f"{district},IN",
            "appid": API_KEY,
            "units": "metric"
        }
        w = requests.get(weather_url, params=weather_params, timeout=5).json()

        if "coord" not in w:
            return {"status": "unavailable"}

        lat = w["coord"]["lat"]
        lon = w["coord"]["lon"]

        # 🌫 AQI
        aqi_url = "https://api.openweathermap.org/data/2.5/air_pollution"
        aqi_params = {
            "lat": lat,
            "lon": lon,
            "appid": API_KEY
        }
        aqi_data = requests.get(aqi_url, params=aqi_params, timeout=5).json()

        aqi_index = aqi_data["list"][0]["main"]["aqi"]

        aqi_map = {
            1: "Good",
            2: "Fair",
            3: "Moderate",
            4: "Poor",
            5: "Very Poor"
        }

        # 🌧 Rain
        rain = w.get("rain", {}).get("1h", 0)

        # ⚠ Disease Risk Logic (simple but effective)
        risk = "Low"
        if w["main"]["humidity"] > 70 and rain > 0:
            risk = "High"
        elif w["main"]["humidity"] > 60:
            risk = "Moderate"

        return {
            "temperature": w["main"]["temp"],
            "humidity": w["main"]["humidity"],
            "rainfall_mm": rain,
            "aqi": {
                "index": aqi_index,
                "level": aqi_map.get(aqi_index, "Unknown")
            },
            "disease_risk_alert": risk
        }

    except Exception as e:
        return {
            "status": "unavailable",
            "error": str(e)
        }
