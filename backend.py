from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
import numpy as np
import pandas as pd
from mangum import Mangum

# Initialize the FastAPI app
app = FastAPI()
handler = Mangum(app)

# Load the serialized model and scalers
model = joblib.load('xgb_model.pkl')
scaler_X = joblib.load('scaler_X.pkl')
scaler_y = joblib.load('scaler_y.pkl')
label_encoders = joblib.load('label_encoders.pkl')  # Dictionary of label encoders for categorical features

# Define the input data model
class CarDetails(BaseModel):
    brand: str
    model: str
    trim: str
    kilometers: float
    year: int
    regional_specs: str
    doors: str
    fuel_type: str
    seating_capacity: str
    transmission_type: str
    no_of_cylinders: str
    warranty: str
    seller_type: str

# Endpoint for health check
@app.get("/")
def read_root():
    return {"message": "Welcome to the car price prediction API!"}

@app.post("/predict")
def predict(details: CarDetails):
    try:
        # Convert input data to a DataFrame
        input_data = pd.DataFrame([details.dict()])
        # Encode categorical features using the label encoders
        for col, le in label_encoders.items():
            input_data[col] = le.transform(input_data[col])
        numerical_cols = ['kilometers', 'year']

        # Scale numerical features
        input_data[numerical_cols] = scaler_X.transform(input_data[numerical_cols])

        # Combine scaled numerical data and encoded categorical data
        input_data_scaled = input_data.values
        # Make a prediction
        prediction_normalized = model.predict(input_data_scaled)
        
        # Ensure prediction_normalized is a 2D array
        if prediction_normalized.ndim == 1:
            prediction_normalized = prediction_normalized.reshape(-1, 1)

        # Inverse transform the predicted value
        prediction = scaler_y.inverse_transform(prediction_normalized).flatten()[0]

        return {"predicted_price": float(prediction)}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
