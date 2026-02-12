from fastapi import APIRouter
from app.services.news_service import fetch_farmer_news

router = APIRouter(prefix="/news", tags=["News"])

@router.get("/")
def get_news():
    articles = fetch_farmer_news()
    print("NEWS RAW RESPONSE:", articles)

    return {
        "status": "success",
        "count": len(articles),
        "articles": articles
    }
