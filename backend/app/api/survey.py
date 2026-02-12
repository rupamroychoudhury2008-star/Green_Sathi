from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class Survey(BaseModel):
    name: str | None = None
    state: str
    district: str
    crop: str
    issue: str
    consent: bool

@router.post("/survey")
def submit_survey(data: Survey):
    print("Survey received:", data.dict())
    return {"status": "ok"}
