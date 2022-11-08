from fastapi import FastAPI
import pandas as pd
import pickle

data = pd.read_csv("pruebaAPI.csv")

d = pd.DataFrame(data.dtypes)

# app = FastAPI()


# @app.get("/Data")
def generaFilasColumnas():

    # Arreglo con los nombres de las columnas
    columnas = []

    for i in data.columns.values:
        columnas.append(i)

    # Arreglo con las filas del dataframe separado
    filas = []
    

    # Obtener por fila los datos
    for i in range(2):#data.index.values:
        for c in columnas:
            filas.append(data[c][0])
        filas.append("/separador")
    
    print(columnas)

    print("\n")

    print(filas)
    with open("datosEDA.js","w") as file:
        file.write("export const dataColumnas="+str(columnas)+"\nexport const dataFilas="+str(filas))

generaFilasColumnas()
