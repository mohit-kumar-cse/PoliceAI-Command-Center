# C:\PoliceAI-Command-Center\ai-engine\api\routes.py
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional

from model_service import predict_crime, UnseenLabelError

router = APIRouter()


class CrimeRiskRequest(BaseModel):
    area: str
    day: str
    crime_type: str
    weather: Optional[str] = None
    hour: Optional[int] = None
    month: Optional[int] = None
    previous_crimes: Optional[int] = None
    population_density: Optional[int] = None


@router.post("/predict-crime-risk")
def predict(request: CrimeRiskRequest):
    payload = request.model_dump(exclude_none=True)

    try:
        result = predict_crime(payload)
        return result
    except UnseenLabelError as e:
        raise HTTPException(
            status_code=400,
            detail={
                "message": f"Invalid value for '{e.field}': '{e.value}'",
                "valid_values": e.valid_values,
            },
        )
    except KeyError as e:
        raise HTTPException(status_code=400, detail=f"Missing required field: {e}")