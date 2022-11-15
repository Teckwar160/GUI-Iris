from fastapi import FastAPI, Form
import pandas as pd


#raw = pd.read_csv("pruebaAPI.csv")

data = None



class dataframe:
    def __init__(self,csv):
        self.raw = pd.read_csv(csv)
        self.columnas = self.raw.columns.values.tolist()
        self.filas = filasRaw = self.raw.values.tolist()
        self.sizeColumnas = len(self.columnas)
        self.sizeFilas = len(self.filas)

app = FastAPI()
"""
@app.post("/")
async def init(username: str = Form(...)):
    return username
"""

@app.post("/")
async def init(csv: str = Form(...)):
    global data 
    data = dataframe(csv)
    return "done"
    

@app.get("/vistaPrevia")
def vistaPrevia():
    global data
    if data != None:
        # Obtenemos las filas y columnas
        columnas = data.columnas#raw.columns.values.tolist()
        # Agregamos una columna vacia para los indices
        if columnas[0] != "":
            columnas.insert(0,"")
        filasRaw = data.filas # raw.values.tolist()

        # Lista que contendra las filas
        filas = []

        #Obtenemos los primeros y ultimos 5 elementos del dataframe
        filasHead = data.raw.head().values.tolist()
        filasTail = data.raw.tail().values.tolist()

        tam = len(filasRaw)
        for i in range(0,5):
            filasHead[i].insert(0,i)
            filasTail[4-i].insert(0,tam-i+1)

        filasSeparador = []

        #Agregamos un separador
        for i in columnas:
            filasSeparador.append("...")
        filasHead.append(filasSeparador)

        #Unimos las listas
        filasRaw = filasHead+filasTail

        #Convertimos a string todos los elementos para que sean mostrados
        for fila in filasRaw:
            f = []
            for i in fila:
                f.append(str(i))
            filas.append(f)

        print(filas)
        print("\n")
        print(columnas)

        #Retornamos los elementos
        with open("datosEDA.js", "w") as file:
            file.write("export const dataColumnas="+str(columnas) +
                    "\nexport const dataFilas="+str(filas))

        return "True"
    else:
        return "False"



#generaFilasColumnas()
