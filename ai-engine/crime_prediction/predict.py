# C:\PoliceAI-Command-Center\ai-engine\crime_prediction\predict.py
import joblib
import pandas as pd



# Load model

model = joblib.load(
    "models/crime_model.pkl"
)


# Load encoders

area_encoder = joblib.load(
    "models/area_encoder.pkl"
)

day_encoder = joblib.load(
    "models/day_encoder.pkl"
)

crime_encoder = joblib.load(
    "models/crime_type_encoder.pkl"
)

weather_encoder = joblib.load(
    "models/weather_encoder.pkl"
)



def predict_crime_risk(data):


    data["area"] = area_encoder.transform(
        [data["area"]]
    )[0]


    data["day"] = day_encoder.transform(
        [data["day"]]
    )[0]


    data["crime_type"] = crime_encoder.transform(
        [data["crime_type"]]
    )[0]


    data["weather"] = weather_encoder.transform(
        [data["weather"]]
    )[0]



    df = pd.DataFrame(
        [data]
    )


    prediction = model.predict(df)[0]


    probability = model.predict_proba(df)


    confidence = max(probability[0]) * 100



    risk_map = {

        0:"LOW",

        1:"MEDIUM",

        2:"HIGH"

    }



    return {

        "risk_level":
        risk_map[prediction],

        "risk_score":
         float(round(confidence,2))

    }




# Testing

sample = {


"area":"Sector15",

"day":"Friday",

"hour":23,

"month":7,

"crime_type":"Robbery",

"previous_crimes":80,

"population_density":12000,

"weather":"Rain"


}



result=predict_crime_risk(sample)


print(result)