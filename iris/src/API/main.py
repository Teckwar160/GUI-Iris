from fastapi import FastAPI
import pandas as pd
import pickle

raw = pd.read_csv("pruebaAPI.csv")

data = raw.head(1)

# app = FastAPI()


# @app.get("/Data")
def generaFilasColumnas():
    """
    # Arreglo con los nombres de las columnas
    columnas = []

    for i in data.columns.values:
        columnas.append(i)

    # Arreglo con las filas del dataframe separado
    fila = []
    filas = []

    # Obtener por fila los datos
    for i in data.index.values:
        for c in columnas:
            fila.append(data[c][0])
        filas.append(fila)
        fila = []

    print(columnas)

    print("\n")

    print(filas)
    """
    columnas = data.columns.values.tolist()
    #filas = data.index.values.tolist()

    # Arreglo con las filas del dataframe separado
    fila = []
    filas = []

    # Obtener por fila los datos
    for i in data.index.values:
        for c in columnas:
            fila.append(data[c][0])
        filas.append(fila)
        fila = []

    print(columnas)

    print("\n")

    print(filas)
    with open("datosEDA.js", "w") as file:
        file.write("export const dataColumnas="+str(columnas) +
                   "\nexport const dataFilas="+str(filas))


generaFilasColumnas()
