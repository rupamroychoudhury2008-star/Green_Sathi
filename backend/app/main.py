from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.predict import router as predict_router
from app.api.news import router as news_router
from app.api.survey import router as survey_router
from app.api.chatbot import router as chatbot_router




app = FastAPI(title="Green Sathi API")

app.include_router(survey_router, prefix="/api")
app.include_router(chatbot_router, prefix="/api")



# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API routers
app.include_router(predict_router, prefix="/api")
app.include_router(news_router, prefix="/api")

# Root endpoint
@app.get("/")
def root():
    return {"message": "Green Sathi API is running", "docs": "/docs", "health": "/health"}

# Health check
@app.get("/health")
def health():
    return {"status": "ok"}

