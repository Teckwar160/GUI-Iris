from fastapi import FastAPI, Form, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import random
import pandas as pd
from os import remove
import controlBaseDeDatos as bd

# Para crear vectores y matrices n dimensionales
import numpy as np

# Para la generación de gráficas a partir de los datos
import matplotlib.pyplot as plt

# Para la visualización de datos basado en matplotlib
import seaborn as sns

# Para PCA
from sklearn.decomposition import PCA
from sklearn.preprocessing import StandardScaler, MinMaxScaler

# Para arboles y bosques
from sklearn import model_selection
from sklearn.tree import DecisionTreeRegressor
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score


# Variable global que contendra los conjuntos de datos
data = pd.DataFrame()

# Variables globales de PCA
MEstandarizada = None
dataSinObjectNan = None
pca = None
dataDrop = None

# Variables globales de Arboles
X = None
Y = None
PronosticoAD = None

# Variables globales de Bosques
XB = None
YB = None
PronosticoBA = None

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

# Funciones de apoyo


def convierteStr(data):
    lista = []

    for i in data:
        lista.append(str(i))

    return lista


# Funciones de EDA

@app.get("/vistaPrevia")
async def vistaPrevia():
    # Dataframe
    global data

    if not data.empty:
        # Obtenemos columnas
        columnas = data.columns.values.tolist()

        # Agregamos una columna vacia para los indices
        if columnas[0] != "":
            columnas.insert(0, "")

        # Lista que contendra las filas
        filas = []

        # Obtenemos los primeros y ultimos 5 elementos del dataframe
        filasHead = data.head().values.tolist()
        filasTail = data.tail().values.tolist()

        # Agregamos los indices
        tam = len(data.values.tolist())
        for i in range(0, 5):
            filasHead[i].insert(0, i)
            filasTail[4-i].insert(0, tam-i-1)

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


@app.get("/EDA/Forma")
async def forma():
    # Dataframe
    global data

    if not data.empty:
        return data.shape
    else:
        return False


@app.get("/EDA/TiposDeDatos")
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

        # Retornamos el valor
        return [columnas, filas]
    else:
        return [[], []]


@app.get("/EDA/DatosFaltantesNull")
async def datosFaltantesNul():
    # Dataframe
    global data

    if not data.empty:
        # Definimos las columnas
        columnas = ['Variable', 'Cuenta']

        # Creamos las filas
        filas = list(data.isnull().sum().items())

        # Retornamos el valor
        return [columnas, filas]
    else:
        return [[], []]


@app.get("/EDA/DataHistogramas")
async def dataHistograma():
    global data

    if not data.empty:
        histogramas = []
        tipos = []

        for (key, value) in data.dtypes.items():
            if (str(value) != 'object'):
                tipos.append(key)

        for t in tipos:
            hist = data[t].hist()
            ax = plt.gca()
            p = ax.patches

            # Conseguimos el alto de las barras
            altoBarras = []

            for i in range(len(p)):
                altoBarras.append(p[i].get_height())

            # Conseguimos el identificador de las barras
            inicioBarras = []

            for i in range(len(p)):
                inicioBarras.append(round(p[i].get_x(), 2))

            # Emparejamos los valores
            valores = []

            for (x, y) in zip(inicioBarras, altoBarras):
                valores.append({"id": x, "value": y})

            # Guardamos la información
            histogramas.append(
                {
                    'data': valores,
                    'title': t
                }
            )
            plt.clf()

        # Retornamos los valores
        return histogramas
    else:
        return []


@app.get("/EDA/DataDescribe")
async def dataDescribe():
    global data

    if not data.empty:
        # Obtenemos las columnas
        columnas = data.describe().columns.tolist()

        # Insertamos una columna de más para las medidas
        columnas.insert(0, '')

        # Definimos las medidas
        medidas = ['Cuenta', 'Media', 'Std.',
                   'Min', '25%', '50%', '75%', 'Max']

        # Obtenemos las filas
        filas = data.describe().values.tolist()

        # Acomodamos las filas
        for fila, medida in zip(filas, medidas):
            fila.insert(0, medida)

        # Retornamos el valor
        return [columnas, filas]
    else:
        return [[], []]


@app.get("/EDA/Box")
async def dataBox():
    global data

    if not data.empty:
        # Obtenemos los tipos de los datos
        tipos = []

        for (key, value) in data.dtypes.items():
            if (str(value) != 'object'):
                tipos.append(key)

        # Cajas
        cajas = []

        for t in tipos:
            cajas.append({
                'nombre': t,
                'value': convierteStr(data[t].tolist())
            })

        # Retornamos la información
        return cajas
    else:
        return []


@app.get("/EDA/DataDescribe/Object")
async def dataDescribeObject():
    global data

    if not data.empty:
        # Obtenemos las columnas
        columnas = data.describe(include='object').columns.tolist()

        # Insertamos una columna de más para las medidas
        columnas.insert(0, '')

        # Definimos las medidas
        medidas = ['Cuenta', 'Unico', 'Cima', 'Frecuencia']

        # Obtenemos las filas
        filas = data.describe(include='object').values.tolist()

        # Convertimos a String
        tmp = []
        for i in filas:
            tmp.append(convierteStr(i))

        filas = tmp

        # Acomodamos las filas
        for fila, medida in zip(filas, medidas):
            fila.insert(0, medida)

        # Retornamos el valor
        return [columnas, filas]
    else:
        return [[], []]


@app.get("/EDA/DataHistogramas/Object")
async def dataHistogramaObject():
    global data
    histogramas = []
    tipos = []

    if not data.empty:

        # Obtenemos los nombres de las variables
        for (key, value) in data.dtypes.items():
            if (str(value) == 'object' and data[key].nunique() < 10):
                tipos.append(key)

        for t in tipos:

            # Obtenemos los datos de las barras
            barraEtiqueta = data[t].value_counts().index.tolist()
            barraValor = data[t].value_counts().tolist()

            # Emparejamos los valores
            valores = []

            for (x, y) in zip(barraEtiqueta, barraValor):
                valores.append({"id": str(x), "value": str(y)})

            # Guardamos la información
            histogramas.append(
                {
                    'data': valores,
                    'title': t
                }
            )
            plt.clf()

        # Retornamos los valores
        return histogramas

    else:
        return []


@app.get("/EDA/DataCorrelacion")
async def dataCorrelacion():
    # Dataframe
    global data

    if not data.empty:
        # Obtenemos columnas
        columnas = data.corr().columns.tolist()

        # Lista que contendra las filas
        filas = data.corr().values.tolist()

        # Acomodamos las filas
        for fila, columna in zip(filas, columnas):
            fila.insert(0, columna)

        # Insertamos una columna de más para las etiquetas
        columnas.insert(0, '')

        # Retornamos los elementos
        return [columnas, filas]
    else:
        return [[], []]


@app.get("/EDA/DataCorrelacion/Mapa")
async def dataCorrelacionMapa():
    # Dataframe
    global data

    if not data.empty:
        # Obtenemos columnas
        columnas = data.corr().columns.tolist()

        # Lista que contendra las filas
        filas = data.corr().values.tolist()

        # Lista que contendra la matriz de correlaciones
        mapa = []

        # Damso formato a los datos
        for columna, fila in zip(columnas, filas):
            tmp = []
            for x, y in zip(columnas, fila):
                tmp.append({'x': x, 'y': round(y, 2)})
            mapa.append(
                {
                    'id': columna,
                    'data': tmp
                }
            )
        # Retornamos los elementos
        return mapa
    else:
        return []

# Funciones de PCA


@app.get("/PCA/DataCorrelacion")
async def pcaDataCorrelacion():
    # Dataframe
    global data

    if not data.empty:
        # Obtenemos columnas
        columnas = data.corr(method='pearson').columns.tolist()

        # Lista que contendra las filas
        filas = data.corr(method='pearson').values.tolist()

        # Acomodamos las filas
        for fila, columna in zip(filas, columnas):
            fila.insert(0, columna)

        # Insertamos una columna de más para las etiquetas
        columnas.insert(0, '')

        # Retornamos los elementos
        return [columnas, filas]
    else:
        return [[], []]


@app.get("/PCA/DataCorrelacion/Mapa")
async def pcaDataCorrelacionMapa():
    # Dataframe
    global data

    if not data.empty:
        # Obtenemos columnas
        columnas = data.corr(method='pearson').columns.tolist()

        # Lista que contendra las filas
        filas = data.corr(method='pearson').values.tolist()

        # Lista que contendra la matriz de correlaciones
        mapa = []

        # Damso formato a los datos
        for columna, fila in zip(columnas, filas):
            tmp = []
            for x, y in zip(columnas, fila):
                tmp.append({'x': x, 'y': round(y, 2)})
            mapa.append(
                {
                    'id': columna,
                    'data': tmp
                }
            )
        # Retornamos los elementos
        return mapa
    else:
        return []


@app.post("/PCA/Estandar")
async def pcaMinMaxScaler(metodo: str = Form(...)):
    # Dataframe
    global data
    global MEstandarizada
    global dataSinObjectNan

    if not data.empty:

        # Limpiamos el conjunto de variables categoricas y datos Nan
        dataTmp = data

        for (key, value) in data.dtypes.items():
            if (str(value) == 'object'):
                dataTmp = dataTmp.drop(columns=[key])

        dataSinObjectNan = dataTmp.dropna()

        # Instanciamos al objeto
        if metodo == "StandardScaler":
            Estandarizar = StandardScaler()
        else:
            Estandarizar = MinMaxScaler()

        # Estandarizamos
        MEstandarizada = Estandarizar.fit_transform(dataSinObjectNan)

        # Creamos un dataframe temporal para mostrar
        tmp = pd.DataFrame(MEstandarizada, columns=dataSinObjectNan.columns)

        # Obtenemos columnas
        columnas = tmp.columns.values.tolist()

        # Agregamos una columna vacia para los indices
        if columnas[0] != "":
            columnas.insert(0, "")

        # Lista que contendra las filas
        filas = []

        # Obtenemos los primeros y ultimos 5 elementos del dataframe
        filasHead = tmp.head().values.tolist()
        filasTail = tmp.tail().values.tolist()

        # Agregamos los indices
        tam = len(data.values.tolist())
        for i in range(0, 5):
            filasHead[i].insert(0, i)
            filasTail[4-i].insert(0, tam-i-1)

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


@app.post("/PCA/Componentes")
async def pcaComponentes(numero: str = Form(...)):
    # Dataframe
    global data
    global MEstandarizada
    global pca

    if numero == "None":
        numero = None
    else:
        numero = int(numero)

    if not data.empty:
        # Se instancia el objeto PCA
        pca = PCA(n_components=numero)

        # Se obtienen los componentes
        pca.fit(MEstandarizada)

        componentes = pca.components_.tolist()

        columnas = list(range(len(componentes[0])))

        columnas.insert(0, '#')

        for i, fila in enumerate(componentes):
            fila.insert(0, i)

        return [columnas, componentes]
    else:
        return [[], []]


@app.post("/PCA/Varianza")
async def pcaComponentes(numero: int = Form(...)):
    # Dataframe
    global data
    global MEstandarizada
    global pca

    if not data.empty:
        varianza = pca.explained_variance_ratio_

        varianzaAcumulada = sum(varianza[0:numero])

        componentes = varianza.tolist()

        columnas = ["Número de componente", "Varianza de componente"]

        filas = []

        for i, fila in enumerate(componentes):
            filas.append([i+1, fila])

        return [varianzaAcumulada, columnas, filas]
    else:
        return [[], [], []]


@app.post("/PCA/Paso6")
async def pcaPaso6(numero: int = Form(...)):
    # Dataframe
    global data
    global pca

    if not data.empty:

        cargasComponentes = pd.DataFrame(
            abs(pca.components_), columns=dataSinObjectNan.columns)

        # Obtenemos columnas
        columnas = cargasComponentes.columns.values.tolist()

        # Agregamos una columna vacia para los indices
        if columnas[0] != "":
            columnas.insert(0, "")

        # Lista que contendra las filas
        filas = []
        filasHead = []

        # Lista que contendra las filas
        filasRaw = cargasComponentes.values.tolist()

        # Agregamos los indices
        tam = len(cargasComponentes.values.tolist())
        for i in range(0, tam):
            filasRaw[i].insert(0, i)

        # Convertimos a string todos los elementos para que sean mostrados
        for fila in filasRaw:
            f = []
            for i in fila:
                f.append(str(i))
            filas.append(f)

        # Obtenemos las columnas y filas para el Head

        # Obtenemos columnas
        columnasHead = cargasComponentes.head(numero).columns.values.tolist()

        # Agregamos una columna vacia para los indices
        if columnasHead[0] != "":
            columnasHead.insert(0, "")

        # Lista que contendra las filas
        filasRaw = cargasComponentes.head(numero).values.tolist()

        # Agregamos los indices
        for i in range(0, numero):
            filasRaw[i].insert(0, i)

        # Convertimos a string todos los elementos para que sean mostrados
        for fila in filasRaw:
            f = []
            for i in fila:
                f.append(str(i))
            filasHead.append(f)

        # Retornamos los elementos
        return [columnas, filas, columnasHead, filasHead]
    else:
        return [[], [], [], []]


@app.get("/PCA/trae/Variables")
async def pcaTraeVariables():
    # Dataframe
    global data

    if not data.empty:

        # Obtenemos columnas
        variables = data.columns.values.tolist()

        # Retornamos los elementos
        return variables
    else:
        return []


@app.post("/PCA/Drop")
async def pcaDrop(lista: list = Form(...)):
    # Dataframe
    global data
    global dataDrop

    if not data.empty:
        # Eliminamos la variable
        if lista != [""]:
            lista = lista[0].split(',')
            dataDrop = data.drop(columns=lista)
        else:
            dataDrop = data

        # Obtenemos columnas
        columnas = dataDrop.columns.values.tolist()

        if len(columnas) == 0:
            dataDrop = data
            columnas = dataDrop.columns.values.tolist()

        # Agregamos una columna vacia para los indices
        columnas.insert(0, "")

        # Lista que contendra las filas
        filas = []

        # Obtenemos los primeros y ultimos 5 elementos del dataframe
        filasHead = dataDrop.head().values.tolist()
        filasTail = dataDrop.tail().values.tolist()

        # Agregamos los indices
        tam = len(dataDrop.values.tolist())
        for i in range(0, 5):
            filasHead[i].insert(0, i)
            filasTail[4-i].insert(0, tam-i-1)

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

# Arboles
@app.get("/Arboles/trae/Variables")
async def arbolesTraeVariables():
    # Dataframe
    global data

    if not data.empty:

        # Limpiamos el conjunto de variables categoricas y datos Nan
        dataTmp = data

        for (key, value) in data.dtypes.items():
            if (str(value) == 'object'):
                dataTmp = dataTmp.drop(columns=[key])

        dataTmp = dataTmp.dropna()

        # Obtenemos columnas
        variables = dataTmp.columns.values.tolist()

        # Retornamos los elementos
        return variables
    else:
        return []


@app.post("/Arboles/Drop")
async def arbolesDrop(lista: list = Form(...)):
    # Dataframe
    global data
    global dataDrop

    if not data.empty:
        # Eliminamos la variable
        if lista != [""]:
            lista = lista[0].split(',')
            dataDrop = data.drop(columns=lista)
        else:
            dataDrop = data

        # Limpiamos el conjunto de variables categoricas y datos Nan
        dataTmp = dataDrop

        for (key, value) in dataDrop.dtypes.items():
            if (str(value) == 'object'):
                dataTmp = dataTmp.drop(columns=[key])

        dataDrop = dataTmp.dropna()

        # Obtenemos columnas
        columnas = dataDrop.columns.values.tolist()

        if len(columnas) == 0:
            dataDrop = data
            columnas = dataDrop.columns.values.tolist()

        # Agregamos una columna vacia para los indices
        columnas.insert(0, "")

        # Lista que contendra las filas
        filas = []

        # Obtenemos los primeros y ultimos 5 elementos del dataframe
        filasHead = dataDrop.head().values.tolist()
        filasTail = dataDrop.tail().values.tolist()

        # Agregamos los indices
        tam = len(dataDrop.values.tolist())
        for i in range(0, 5):
            filasHead[i].insert(0, i)
            filasTail[4-i].insert(0, tam-i-1)

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


@app.get("/Arboles/trae/Variables/Seleccion")
async def arbolesTraeVariables():
    # Dataframe
    global data
    global dataDrop

    if not data.empty:

        # Obtenemos columnas
        variables = dataDrop.columns.values.tolist()

        # Retornamos los elementos
        return variables
    else:
        return []


@app.post("/Arboles/seleccionaX")
async def arbolesSeleccionaX(lista: list = Form(...)):
    # Dataframe
    global data
    global dataDrop
    global X

    if not data.empty:
        # Convertimos en lista
        if lista != [""]:
            lista = lista[0].split(',')
        else:
            return False

        # Guardamos la seleccion de X
        X = np.array(dataDrop[lista])

        tmp = pd.DataFrame(X)

        # Obtenemos columnas
        columnas = tmp.columns.values.tolist()

        # Agregamos una columna vacia para los indices
        columnas.insert(0, "")

        # Lista que contendra las filas
        filas = []

        # Obtenemos los primeros y ultimos 5 elementos del dataframe
        filasHead = tmp.head().values.tolist()
        filasTail = tmp.tail().values.tolist()

        # Agregamos los indices
        tam = len(tmp.values.tolist())
        for i in range(0, 5):
            filasHead[i].insert(0, i)
            filasTail[4-i].insert(0, tam-i-1)

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


@app.post("/Arboles/seleccionaY")
async def arbolesSeleccionaY(lista: list = Form(...)):
    # Dataframe
    global data
    global dataDrop
    global Y

    if not data.empty:
        # Convertimos a lista
        if lista != [""]:
            lista = lista[0].split(',')
        else:
            return False
        print(lista)
        # Guardamos la seleccion de Y
        Y = np.array(dataDrop[lista[0]])

        tmp = pd.DataFrame(Y)

        # Obtenemos columnas
        columnas = tmp.columns.values.tolist()

        # Agregamos una columna vacia para los indices
        columnas.insert(0, "")

        # Lista que contendra las filas
        filas = []

        # Obtenemos los primeros y ultimos 5 elementos del dataframe
        filasHead = tmp.head().values.tolist()
        filasTail = tmp.tail().values.tolist()

        # Agregamos los indices
        tam = len(tmp.values.tolist())
        for i in range(0, 5):
            filasHead[i].insert(0, i)
            filasTail[4-i].insert(0, tam-i-1)

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

@app.post("/Arboles/Pronostico/Entrenamiento")
async def arbolesDivision(max_depth: str = Form(...), min_samples_split: str = Form(...), min_samples_leaf: str = Form(...), random_state: str = Form(...)):
    # Variables
    global data
    global PronosticoAD
    global X
    global Y

    if not data.empty:

        # Divisón de datos
        X_train, X_test, Y_train, Y_test = model_selection.train_test_split(
            X, Y, test_size=0.2, random_state=0, shuffle=True)

        if max_depth == "None":
            max_depth = None
        else:
            max_depth = int(max_depth)

        PronosticoAD = DecisionTreeRegressor(
            max_depth=max_depth, min_samples_split=int(min_samples_split), min_samples_leaf=int(min_samples_leaf), random_state=int(random_state))
        PronosticoAD.fit(X_train, Y_train)

        # Se genera el pronóstico
        Y_Pronostico = PronosticoAD.predict(X_test)

        # Medidas
        return [PronosticoAD.criterion,
                mean_absolute_error(Y_test, Y_Pronostico),
                mean_squared_error(Y_test, Y_Pronostico),
                mean_squared_error(Y_test, Y_Pronostico, squared=False),
                r2_score(Y_test, Y_Pronostico)]

    else:
        return False

@app.post("/Arboles/nuevoPronostico")
async def arbolesNuevoPronostico(lista: list = Form(...)):
    # Dataframe
    global data
    global PronosticoAD

    if not data.empty:
        if lista != [""]:
            lista = lista[0].split(',')
        else:
            return False

        diccionario = {}

        for i in range(0, len(lista)):
            if i % 2 == 0:
                diccionario[lista[i]] = [int(lista[i+1])]
            else:
                continue

        pronostico = pd.DataFrame(diccionario)

        return (PronosticoAD.predict(pronostico).tolist())[0]

    else:
        return [False]


# Bosques
@app.post("/Bosques/seleccionaX")
async def bosquesSeleccionaX(lista: list = Form(...)):
    # Dataframe
    global data
    global dataDrop
    global XB

    if not data.empty:
        # Convertimos en lista
        if lista != [""]:
            lista = lista[0].split(',')
        else:
            return False

        # Guardamos la seleccion de X
        XB = np.array(dataDrop[lista])

        tmp = pd.DataFrame(XB)

        # Obtenemos columnas
        columnas = tmp.columns.values.tolist()

        # Agregamos una columna vacia para los indices
        columnas.insert(0, "")

        # Lista que contendra las filas
        filas = []

        # Obtenemos los primeros y ultimos 5 elementos del dataframe
        filasHead = tmp.head().values.tolist()
        filasTail = tmp.tail().values.tolist()

        # Agregamos los indices
        tam = len(tmp.values.tolist())
        for i in range(0, 5):
            filasHead[i].insert(0, i)
            filasTail[4-i].insert(0, tam-i-1)

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


@app.post("/Bosques/seleccionaY")
async def bosquesSeleccionaY(lista: list = Form(...)):
    # Dataframe
    global data
    global dataDrop
    global YB

    if not data.empty:
        # Convertimos a lista
        if lista != [""]:
            lista = lista[0].split(',')
        else:
            return False
        print(lista)
        # Guardamos la seleccion de Y
        YB = np.array(dataDrop[lista[0]])

        tmp = pd.DataFrame(YB)

        # Obtenemos columnas
        columnas = tmp.columns.values.tolist()

        # Agregamos una columna vacia para los indices
        columnas.insert(0, "")

        # Lista que contendra las filas
        filas = []

        # Obtenemos los primeros y ultimos 5 elementos del dataframe
        filasHead = tmp.head().values.tolist()
        filasTail = tmp.tail().values.tolist()

        # Agregamos los indices
        tam = len(tmp.values.tolist())
        for i in range(0, 5):
            filasHead[i].insert(0, i)
            filasTail[4-i].insert(0, tam-i-1)

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



@app.post("/Bosques/Pronostico/Entrenamiento")
async def arbolesDivision(n_estimators: str = Form(...), max_depth: str = Form(...), \
    min_samples_split: str = Form(...), min_samples_leaf: str = Form(...), random_state: str = Form(...)):
    # Variables
    global data
    global PronosticoBA
    global XB
    global YB

    if not data.empty:

        # Divisón de datos
        X_train, X_test, Y_train, Y_test = model_selection.train_test_split(
            XB, YB, test_size=0.2, random_state=0, shuffle=True)

        if max_depth == "None":
            max_depth = None
        else:
            max_depth = int(max_depth)

        PronosticoBA = RandomForestRegressor(n_estimators=int(n_estimators),
        max_depth=max_depth, min_samples_split=int(min_samples_split), 
        min_samples_leaf=int(min_samples_leaf), random_state=int(random_state))
        PronosticoBA.fit(X_train, Y_train)

        # Se genera el pronóstico
        Y_Pronostico = PronosticoBA.predict(X_test)

        # Medidas
        return [PronosticoBA.criterion,
                mean_absolute_error(Y_test, Y_Pronostico),
                mean_squared_error(Y_test, Y_Pronostico),
                mean_squared_error(Y_test, Y_Pronostico, squared=False),
                r2_score(Y_test, Y_Pronostico)]

    else:
        return False

@app.post("/Bosques/nuevoPronostico")
async def arbolesNuevoPronostico(lista: list = Form(...)):
    # Dataframe
    global data
    global PronosticoBA

    if not data.empty:
        if lista != [""]:
            lista = lista[0].split(',')
        else:
            return False

        diccionario = {}

        for i in range(0, len(lista)):
            if i % 2 == 0:
                diccionario[lista[i]] = [int(lista[i+1])]
            else:
                continue

        pronostico = pd.DataFrame(diccionario)

        return (PronosticoBA.predict(pronostico).tolist())[0]

    else:
        return [False]

# Funciones de control


@ app.post("/crear/Proyecto")
async def createProyecto(nombre: str = Form(...), file: UploadFile = Form(...), descripcion: str = Form(...)):

    # Creamos un dataframe
    data = pd.read_csv(file.file)

    # Ruta de guardado
    ruta = "Proyectos/"+str(random.randint(0, 9999))+"_"+file.filename

    # Guardamos el archivo
    with open(ruta, "w") as archivo:
        data.to_csv(archivo, index=False)

    # Ingresamos los datos a la base de datos
    bd.insertarFila(nombre, ruta, file.filename, descripcion)

    return True


@ app.get("/trae/Proyectos")
async def traeProyectos():
    return bd.leerFilas()


@ app.post("/editar/Proyecto")
async def createProyecto(id: int = Form(...), nombre: str = Form(...), descripcion: str = Form(...)):

    # Actualizamos los valores
    bd.actualizarNombre(id, nombre)

    bd.actualizarDescripcion(id, descripcion)

    return True


@ app.post("/eliminar/Proyecto")
async def createProyecto(id: int = Form(...)):

    # Buscamos el proyecto
    fila = bd.buscarFila(id)

    # Eliminamos el proyecto
    bd.eliminarFila(id)

    # Eliminamos el archivo
    remove(fila[0][2])

    return True


@ app.post("/cargar/Proyecto")
async def createProyecto(id: int = Form(...)):
    global data

    # Buscamos el proyecto
    fila = bd.buscarFila(id)

    # Cargamos el proyecto
    data = pd.read_csv(fila[0][2])

    return True
