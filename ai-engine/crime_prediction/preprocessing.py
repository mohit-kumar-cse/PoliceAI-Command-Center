# C:\PoliceAI-Command-Center\ai-engine\crime_prediction\preprocessing.py
import pandas as pd

from sklearn.preprocessing import LabelEncoder

import joblib

import os



MODEL_PATH="models"



def load_data():

    df=pd.read_csv(
        "dataset/crime_data.csv"
    )

    return df





def preprocess_data():

    df=load_data()


    os.makedirs(
        MODEL_PATH,
        exist_ok=True
    )


    categorical_columns=[

        "area",
        "day",
        "crime_type",
        "weather"

    ]



    for col in categorical_columns:


        encoder=LabelEncoder()


        df[col]=encoder.fit_transform(
            df[col]
        )


        joblib.dump(

            encoder,

            f"{MODEL_PATH}/{col}_encoder.pkl"

        )



    X=df.drop(
        "risk",
        axis=1
    )


    y=df["risk"]



    return X,y





if __name__=="__main__":


    X,y=preprocess_data()


    print(X.head())

    print()

    print(y.head())


    print()

    print("Encoders Saved Successfully")