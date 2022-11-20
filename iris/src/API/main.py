from fastapi import FastAPI, Form, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd

# Variable global que contendra los conjuntos de datos
data = None

# Clase que nos 
class conjuntoDatos:
    def __init__(self, csv):
        self.raw = csv
        self.columnas = self.raw.columns.values.tolist()
        self.filas = self.raw.values.tolist()
        self.sizeColumnas = len(self.columnas)
        self.sizeFilas = len(self.filas)


app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.post("/")
async def init(csv: str = Form(...)):
    global data
    data = conjuntoDatos(csv)
    return "done"


@app.get("/vistaPrevia")
async def vistaPrevia():
    # Dataframe
    global data

    if data != None:
        # Obtenemos columnas
        columnas = data.columnas

        # Agregamos una columna vacia para los indices
        if columnas[0] != "":
            columnas.insert(0, "")

        # Lista que contendra las filas
        filas = []

        # Obtenemos los primeros y ultimos 5 elementos del dataframe
        filasHead = data.raw.head().values.tolist()
        filasTail = data.raw.tail().values.tolist()

        # Agregamos los indices
        tam = len(data.filas)
        for i in range(0, 5):
            filasHead[i].insert(0, i)
            filasTail[4-i].insert(0, tam-i+1)

        # Agregamos un separador
        filasSeparador = []

        for i in columnas:
            filasSeparador.append("...")
        filasHead.append(filasSeparador)

        # Unimos las listas
        filasRaw = filasHead+filasTail

        # Convertimos a string todos los elementos para que sean mostrados
        for fila in filasRaw:
            f = []
            for i in fila:
                f.append(str(i))
            filas.append(f)

        # Retornamos los elementos
        return [columnas, filas]
    else:
        return [[], []]


@app.post("/upload/dataframe")
async def uploadDataframe(file: UploadFile):

    global data
    data = conjuntoDatos(pd.read_csv(file.file))

    return {"Archivo cargado": file.filename}
