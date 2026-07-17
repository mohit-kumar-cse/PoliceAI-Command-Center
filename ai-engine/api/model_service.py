# C:\PoliceAI-Command-Center\ai-engine\api\model_service.py
import os
from datetime import datetime

import joblib
import pandas as pd

BASE_DIR = os.path.dirname(os.path.dirname(__file__))
MODEL_DIR = os.path.join(BASE_DIR, "crime_prediction", "models")

# Load trained model + encoders once at startup
model = joblib.load(os.path.join(MODEL_DIR, "crime_model.pkl"))
area_encoder = joblib.load(os.path.join(MODEL_DIR, "area_encoder.pkl"))
day_encoder = joblib.load(os.path.join(MODEL_DIR, "day_encoder.pkl"))
crime_encoder = joblib.load(os.path.join(MODEL_DIR, "crime_type_encoder.pkl"))
weather_encoder = joblib.load(os.path.join(MODEL_DIR, "weather_encoder.pkl"))

RISK_LEVELS = {0: "LOW", 1: "MEDIUM", 2: "HIGH"}

# Approximate population density per area (people/km²).
# Used as a fallback when the caller doesn't supply one directly.
AREA_POPULATION_DENSITY = {
    "AirportRoad": 6500,
    "IndustrialZone": 4200,
    "MarketArea": 18500,
    "RailwayStation": 17200,
    "Residential": 9800,
    "Sector15": 12100,
    "Sector20": 10600,
}
DEFAULT_POPULATION_DENSITY = 11540  # dataset mean, used if area isn't in the table above

DEFAULT_WEATHER = "Clear"
DEFAULT_PREVIOUS_CRIMES = 50  # dataset mean, used if caller doesn't supply real historical count

# Column order must match what the model was trained on
FEATURE_ORDER = [
    "area", "day", "hour", "month",
    "crime_type", "previous_crimes", "population_density", "weather",
]


class UnseenLabelError(Exception):
    """Raised when an input value wasn't seen during model training."""
    def __init__(self, field: str, value: str, valid_values: list):
        self.field = field
        self.value = value
        self.valid_values = valid_values
        super().__init__(f"Unknown {field}: '{value}'")


def _safe_transform(encoder, field_name: str, value: str):
    try:
        return encoder.transform([value])[0]
    except ValueError:
        raise UnseenLabelError(field_name, value, list(encoder.classes_))


def predict_crime(data: dict) -> dict:
    now = datetime.now()

    raw_area = data["area"]
    weather = data.get("weather", DEFAULT_WEATHER)
    hour = data.get("hour", now.hour)
    month = data.get("month", now.month)
    previous_crimes = data.get("previous_crimes", DEFAULT_PREVIOUS_CRIMES)
    population_density = data.get(
        "population_density",
        AREA_POPULATION_DENSITY.get(raw_area, DEFAULT_POPULATION_DENSITY),
    )

    row = {
        "area": _safe_transform(area_encoder, "area", raw_area),
        "day": _safe_transform(day_encoder, "day", data["day"]),
        "hour": hour,
        "month": month,
        "crime_type": _safe_transform(crime_encoder, "crime_type", data["crime_type"]),
        "previous_crimes": previous_crimes,
        "population_density": population_density,
        "weather": _safe_transform(weather_encoder, "weather", weather),
    }

    df = pd.DataFrame([row])[FEATURE_ORDER]

    prediction = model.predict(df)[0]
    probability = model.predict_proba(df)
    score = float(max(probability[0]) * 100)

    return {
        "risk_level": RISK_LEVELS[prediction],
        "risk_score": round(score, 2),
        "context_used": {
            "hour": hour,
            "month": month,
            "weather": weather,
            "previous_crimes": previous_crimes,
            "population_density": population_density,
        },
    }