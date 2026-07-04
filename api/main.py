from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pickle
import os

app = FastAPI(title="Student Performance Predictor API")

# Configure CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict this to your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the trained model
MODEL_PATH = os.path.join(os.path.dirname(__file__), "models", "rf_model.pkl")
model = None

@app.on_event("startup")
def load_model():
    global model
    if os.path.exists(MODEL_PATH):
        with open(MODEL_PATH, "rb") as f:
            model = pickle.load(f)
        print("Model loaded successfully.")
    else:
        print("Warning: Model file not found. Please train the model first.")

class PredictionRequest(BaseModel):
    StudyHours: float
    PreviousScore: float
    SleepHours: float
    Attendance: float

class PredictionResponse(BaseModel):
    PredictedScore: float

@app.get("/")
def read_root():
    return {"message": "Welcome to the Student Performance Predictor API"}

@app.post("/predict", response_model=PredictionResponse)
def predict_performance(data: PredictionRequest):
    if model is None:
        raise HTTPException(status_code=503, detail="Model is currently unavailable")
    
    # Prepare data for prediction (must match training feature order)
    features = [[
        data.StudyHours,
        data.PreviousScore,
        data.SleepHours,
        data.Attendance
    ]]
    
    try:
        prediction = model.predict(features)
        return PredictionResponse(PredictedScore=round(prediction[0], 2))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
