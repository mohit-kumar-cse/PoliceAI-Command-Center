# C:\PoliceAI-Command-Center\ai-engine\api\main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import router

app = FastAPI(
    title="Police AI Crime Prediction API",
    description="AI powered crime risk prediction system",
    version="1.0"
)

# Allow the Node server / React client to call this API directly if needed
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)


@app.get("/")
def home():
    return {"message": "Police AI Engine Running 🚔", "status": "ACTIVE"}