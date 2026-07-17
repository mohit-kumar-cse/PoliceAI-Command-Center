# C:\PoliceAI-Command-Center\ai-engine\crime_prediction\train.py
from preprocessing import preprocess_data

from sklearn.model_selection import train_test_split

from sklearn.ensemble import RandomForestClassifier

from sklearn.metrics import accuracy_score, classification_report

import joblib

import os



# Load processed data

X,y = preprocess_data()



# Split dataset

X_train, X_test, y_train, y_test = train_test_split(

    X,
    y,
    test_size=0.2,
    random_state=42

)



# Create model

model = RandomForestClassifier(

    n_estimators=100,

    random_state=42

)



# Train model

model.fit(

    X_train,

    y_train

)



# Prediction

y_pred = model.predict(

    X_test

)



# Evaluation

accuracy = accuracy_score(

    y_test,

    y_pred

)



print(
    "Model Accuracy:",
    accuracy
)



print("\nClassification Report:\n")

print(
    classification_report(
        y_test,
        y_pred
    )
)



# Save model

os.makedirs(

    "models",

    exist_ok=True

)



joblib.dump(

    model,

    "models/crime_model.pkl"

)



print(

"Crime Prediction Model Saved Successfully 🚔"

)