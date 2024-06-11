from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
import numpy as np
import pandas as pd

# Initialize the FastAPI app
app = FastAPI()

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
    year: int
    kilometers: float
    regional_specs: str
    doors: int
    body_type: str
    fuel_type: str
    seating_capacity: int
    transmission_type: str
    engine_capacity_cc: str
    horsepower: str
    no_of_cylinders: int
    exterior_color: str
    interior_color: str
    warranty: str
    city: str
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

        print("okkk   ", input_data)

        # Encode categorical features using the label encoders
        for col, le in label_encoders.items():
            input_data[col] = le.transform(input_data[col])

        # Define the numerical columns
        numerical_cols = ['kilometers', 'year']

        # Scale numerical features
        input_data[numerical_cols] = scaler_X.transform(input_data[numerical_cols])

        # Combine scaled numerical data and encoded categorical data
        input_data_scaled = input_data.values
        print(input_data_scaled,"   HUH")

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
