import os
import time
import requests
from dotenv import load_dotenv

load_dotenv()

NEWS_API_KEY = os.getenv("NEWS_API_KEY")
NEWS_API_URL = "https://newsdata.io/api/1/news"

# Simple in-memory cache
_CACHE = {
    "data": None,
    "timestamp": 0
}

CACHE_TTL = 15 * 60  # 15 minutes


def fetch_farmer_news():
    """
    Fetch farmer-related news.
    Always returns a LIST (never raises to frontend).
    """

    # 1️⃣ Serve from cache if valid
    now = time.time()
    if _CACHE["data"] and (now - _CACHE["timestamp"] < CACHE_TTL):
        return _CACHE["data"]

    if not NEWS_API_KEY:
        print("❌ NEWS_API_KEY missing")
        return []

    params = {
        "apikey": NEWS_API_KEY,
        "q": "farmer OR agriculture OR crops OR farming OR government scheme",
        "country": "in",
        "language": "en",
        "category": "politics,environment",
        "size": 10,
    }

    try:
        response = requests.get(
            NEWS_API_URL,
            params=params,
            timeout=8  # ⏱ prevents infinite wait
        )

        response.raise_for_status()
        raw = response.json()

        articles = []

        if raw.get("status") != "success":
            print("❌ News API returned error:", raw)
            return []

        results = raw.get("results", [])
        articles = []

        for item in results:
            articles.append({
                "title": item.get("title") or "No title",
                "description": item.get("description") or "",
                "source": item.get("source_id") or "unknown",
                "url": item.get("link"),
                "published_at": item.get("pubDate"),
            })
 
        # 2️⃣ Save to cache
        _CACHE["data"] = articles
        _CACHE["timestamp"] = now

        return articles

    except Exception as e:
        print("❌ News fetch failed:", e)
        return []
