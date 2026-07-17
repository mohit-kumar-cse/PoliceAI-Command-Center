# C:\PoliceAI-Command-Center\ai-engine\crime_prediction\dataset_generator.py
import pandas as pd
import random
import os



areas = [

    "Sector15",
    "Sector20",
    "MarketArea",
    "RailwayStation",
    "AirportRoad",
    "Residential",
    "IndustrialZone"

]


days = [

    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"

]


crime_types = [

    "Robbery",
    "Theft",
    "Assault",
    "Vehicle Theft",
    "Burglary",
    "Suspicious"

]


weather_conditions = [

    "Clear",
    "Rain",
    "Fog"

]



def calculate_risk(
        hour,
        previous_crimes,
        population_density,
        crime_type
):


    score = 0



    # Night crime risk

    if hour >= 20 or hour <= 4:

        score += 30



    # Previous crime history

    if previous_crimes > 60:

        score += 30

    elif previous_crimes > 30:

        score += 15



    # Population density

    if population_density > 10000:

        score += 20



    # Serious crimes

    if crime_type in [
        "Robbery",
        "Assault"
    ]:

        score += 20



    if score >= 60:

        return 2


    elif score >= 30:

        return 1


    else:

        return 0




records = []



for i in range(10000):


    area=random.choice(areas)

    day=random.choice(days)

    hour=random.randint(
        0,
        23
    )

    month=random.randint(
        1,
        12
    )


    crime=random.choice(
        crime_types
    )


    previous_crimes=random.randint(
        0,
        100
    )


    population_density=random.randint(
        3000,
        20000
    )


    weather=random.choice(
        weather_conditions
    )



    risk=calculate_risk(

        hour,

        previous_crimes,

        population_density,

        crime

    )



    records.append({

        "area":area,

        "day":day,

        "hour":hour,

        "month":month,

        "crime_type":crime,

        "previous_crimes":previous_crimes,

        "population_density":population_density,

        "weather":weather,

        "risk":risk

    })




df=pd.DataFrame(records)



os.makedirs(
    "dataset",
    exist_ok=True
)



df.to_csv(

    "dataset/crime_data.csv",

    index=False

)



print(
    "Crime Dataset Generated Successfully 🚔"
)


print(
    df.head()
)


print(
    df["risk"].value_counts()
)