from fastapi import FastAPI, Form, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import random
import pandas as pd
from os import remove
import controlBaseDeDatos as bd

import numpy as np                # Para crear vectores y matrices n dimensionales
import matplotlib.pyplot as plt   # Para la generación de gráficas a partir de los datos
import seaborn as sns             # Para la visualización de datos basado en matplotlib
    

# Variable global que contendra los conjuntos de datos
data = pd.DataFrame()

# Clase que nos ayuda a manipular los datos


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

# Funciones de EDA


@app.get("/vistaPrevia")
async def vistaPrevia():
    # Dataframe
    global data

    if not data.empty:
        # Obtenemos columnas
        columnas = data.columns.values.tolist()

        # Cambiamos el nombre de la primer columna
        columnas[0] = ""

        # Lista que contendra las filas
        filas = []

        # Obtenemos los primeros y ultimos 5 elementos del dataframe
        filasHead = data.head().values.tolist()
        filasTail = data.tail().values.tolist()

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


@app.get("/Forma")
async def forma():
    # Dataframe
    global data

    if not data.empty:
        return data.shape
    else:
        return False


@app.get("/TiposDeDatos")
async def tiposDeDatos():
    # Dataframe
    global data

    if not data.empty:
        # Definimos las columnas
        columnas = ['Variable', 'Tipo']

        # Creamos las filas
        filas = []

        for (k, v) in data.dtypes.items():
            filas.append((k, str(v)))

        # ELiminamos el primer elemento que es irrelevante
        filas.pop(0)

        # Retornamos el valor
        return [columnas, filas]
    else:
        return [[], []]


@app.get("/DatosFaltantesNull")
async def datosFaltantesNul():
    # Dataframe
    global data

    if not data.empty:
        # Definimos las columnas
        columnas = ['Variable', 'Cuenta']

        # Creamos las filas
        filas = list(data.isnull().sum().items())

         # ELiminamos el primer elemento que es irrelevante
        filas.pop(0)

        # Retornamos el valor
        return [columnas, filas]
    else:
        return [[], []]

@app.get("/DataHistogramas")
async def dataHistograma():
    global data

    histogramas = []       
    tipos=[]

    for (k,v) in data.dtypes.items():
        if(str(v) != 'object'):
            tipos.append(k)

    # Borramos el primer elemento que es irrelevante
    tipos.pop(0)

    for t in tipos:
        hist = data[t].hist()
        ax = plt.gca()
        p = ax.patches

        # Alto de las barras (y)
        altoBarras=[]

        for i in range(len(p)):
            altoBarras.append(p[i].get_height())

        # Inicio de las barras (x)
        inicioBarras=[]

        for i in range(len(p)):
            inicioBarras.append(p[i].get_x())
            
        diferencia = (p[1].get_x() - p[0].get_x()) /2

        mitadBarras = []

        for i in inicioBarras:
            mitadBarras.append(round(diferencia+i,1))

        valores =[]

        for (x,y) in zip(altoBarras,mitadBarras):
            valores.append({"id":x,"value":y})
            
        histogramas.append(
            {
                'data':valores,
                'title':t
            }
        )
        plt.clf()

    return histogramas

# Funciones de control


@app.post("/crear/Proyecto")
async def createProyecto(nombre: str = Form(...), file: UploadFile = Form(...), descripcion: str = Form(...)):

    # Creamos un dataframe
    data = pd.read_csv(file.file)

    # Ruta de guardado
    ruta = "Proyectos/"+str(random.randint(0, 9999))+"_"+file.filename

    # Guardamos el archivo
    with open(ruta, "w") as archivo:
        data.to_csv(archivo)

    # Ingresamos los datos a la base de datos
    bd.insertarFila(nombre, ruta, file.filename, descripcion)

    return True


@app.get("/trae/Proyectos")
async def traeProyectos():
    return bd.leerFilas()


@app.post("/editar/Proyecto")
async def createProyecto(id: int = Form(...), nombre: str = Form(...), descripcion: str = Form(...)):

    # Actualizamos los valores
    bd.actualizarNombre(id, nombre)

    bd.actualizarDescripcion(id, descripcion)

    return True


@app.post("/eliminar/Proyecto")
async def createProyecto(id: int = Form(...)):

    # Buscamos el proyecto
    fila = bd.buscarFila(id)

    # Eliminamos el proyecto
    bd.eliminarFila(id)

    # Eliminamos el archivo
    remove(fila[0][2])

    return True


@app.post("/cargar/Proyecto")
async def createProyecto(id: int = Form(...)):
    global data

    # Buscamos el proyecto
    fila = bd.buscarFila(id)

    # Cargamos el proyecto
    data = pd.read_csv(fila[0][2])

    return True
