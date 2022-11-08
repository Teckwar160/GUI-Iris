from fastapi import FastAPI
import pandas as pd
import json

data = pd.read_csv("pruebaAPI.csv")

d = pd.DataFrame(data.dtypes)

#app = FastAPI()


# @app.get("/Data")
def download():

    # with open("datos.js","w") as file:
    #   file.write("export const data=")

    # Arreglo con los nombres de las columnas
    columnas = data.columns.values
    print(columnas)

    print("\n")

    filas = data.index.values
    print(filas)

    print("\n")

    #Obtener por fila los datos
    for i in data.index.values:
        for c in columnas:
            print(data[c][i])


download()
