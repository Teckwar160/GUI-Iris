from fastapi import FastAPI
import pandas as pd
import json

data = pd.read_csv("pruebaAPI.csv")

d = pd.DataFrame(data.dtypes)

app = FastAPI()


@app.get("/Data")
def download():
    print(data.columns)