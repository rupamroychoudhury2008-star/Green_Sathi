# app/api/payment.py

from fastapi import APIRouter, HTTPException
from app.services.payment_service import create_payment_order

router = APIRouter(prefix="/payment", tags=["Payment"])


@router.post("/create-order")
def create_order(amount: int):
    try:
        # Convert ₹ to paise
        order = create_payment_order(amount * 100)
        return {
            "order_id": order["id"],
            "amount": order["amount"],
            "currency": order["currency"]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
