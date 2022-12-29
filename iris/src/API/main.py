# Bibliotecas globales
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

# Para Pronostico de arboles y bosques
from sklearn import model_selection
from sklearn.tree import DecisionTreeRegressor
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score

# Para Clasificacion de arboles y bosques
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report
from sklearn.metrics import confusion_matrix
from sklearn.metrics import accuracy_score

# Para K-means
from sklearn.cluster import KMeans
from sklearn.metrics import pairwise_distances_argmin_min
from kneed import KneeLocator

# Para SVM
from sklearn import model_selection
from sklearn.svm import SVC                         
from sklearn.metrics import accuracy_score


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
ClasificacionAD = None

# Variables globales de Bosques
XB = None
YB = None
PronosticoBA = None
ClasificacionBA = None

# Variables de clasificacion
X_validation = None
Y_validation = None

# Variables de K-means
SSE = None
Knee = None

# Variables para SVM
ModeloSVM = None

# API
app = FastAPI()

# Para poder utilizarla con react
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

# Función encargada de convertir una lista en lista de string
def convierteStr(data):
    lista = []

    for i in data:
        lista.append(str(i))

    return lista

# Función encargada de obtener filas y columnas para las tablas
def creaTabla(dataframe,completa):
    # Obtenemos columnas
    columnas = dataframe.columns.values.tolist()

    # Agregamos una columna vacia para los indices
    if columnas[0] != "":
        columnas.insert(0, "")

    # Lista que contendra las filas
    filas = []

    if(completa):
        # Obtenemos los primeros y ultimos 5 elementos del dataframe
        filasHead = dataframe.head().values.tolist()
        filasTail = dataframe.tail().values.tolist()

        # Agregamos los indices
        tam = len(dataframe.values.tolist())
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
    else:
        # Lista que contendra las filas
        filasRaw = dataframe.values.tolist()

        # Agregamos los indices
        tam = len(dataframe.values.tolist())
        for i in range(0, tam):
            filasRaw[i].insert(0, i)       

    # Convertimos a string todos los elementos para que sean mostrados
    for fila in filasRaw:
        f = []
        for i in fila:
            f.append(str(i))
        filas.append(f)

    # Retornamos los elementos
    return [columnas, filas]

# Función encargada de obtener las filas y columnas con formato para series
def creaTablaSeries(serie,columna1,columna2):
    c = serie.index.tolist()
    f = serie.values.tolist()

    columnas = [columna1,columna2]
    filas = []

    for i in range(len(c)):
        filas.append([c[i],f[i]])

    return [columnas,filas]

@app.get("/vistaPrevia")
async def vistaPrevia():
    # Dataframe
    global data

    # Verificamos que este cargado un proyecto
    if not data.empty:
        # Creamos la tabla
        return creaTabla(data,True)
    else:
        return False

# Funciones de EDA

@app.get("/EDA/Forma")
async def forma():
    # Dataframe
    global data

    # Verificamos que este cargado un proyecto
    if not data.empty:
        return data.shape
    else:
        return False


@app.get("/EDA/TiposDeDatos")
async def tiposDeDatos():
    # Dataframe
    global data

    # Verificamos que este cargado un proyecto
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
        return False


@app.get("/EDA/DatosFaltantesNull")
async def datosFaltantesNul():
    # Dataframe
    global data

    # Verificamos que este cargado un proyecto
    if not data.empty:
        # Definimos las columnas
        columnas = ['Variable', 'Cuenta']

        # Creamos las filas
        filas = list(data.isnull().sum().items())

        # Retornamos el valor
        return [columnas, filas]
    else:
        return False


@app.get("/EDA/DataHistogramas")
async def dataHistograma():
    # Dataframe
    global data

    # Verificamos que este cargado un proyecto
    if not data.empty:
        histogramas = []
        tipos = []

        # Quitamos las variables no numericas
        for (key, value) in data.dtypes.items():
            if (str(value) != 'object'):
                tipos.append(key)

        # Creamos el histograma de cada variable
        for t in tipos:
            hist = data[t].hist()
            ax = plt.gca()
            p = ax.patches

            # Conseguimos el alto de las barras
            altoBarras = []

            for i in range(len(p)):
                altoBarras.append(p[i].get_height())

            # Conseguimos el identificador de las barras
            identificador = []

            for i in range(len(p)):
                identificador.append(round(p[i].get_x(), 2))

            # Emparejamos los valores
            valores = []

            for (x, y) in zip(identificador, altoBarras):
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
        return False


@app.get("/EDA/DataDescribe")
async def dataDescribe():
    # Dataframe
    global data

    # Verificamos que este cargado un proyecto
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
        return False


@app.get("/EDA/Box")
async def dataBox():
    # Dataframe
    global data

    # Verificamos que este cargado un proyecto
    if not data.empty:
        # Obtenemos los tipos de los datos
        tipos = []

        # Quitamos las variables no numericas
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
        return False


@app.get("/EDA/DataDescribe/Object")
async def dataDescribeObject():
    # Dataframe
    global data

    # Verificamos que este cargado un proyecto
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
        return False


@app.get("/EDA/DataHistogramas/Object")
async def dataHistogramaObject():
    # Dataframe
    global data

    # Listas
    histogramas = []
    tipos = []

    # Verificamos que este cargado un proyecto
    if not data.empty:

        # Obtenemos los nombres de las variables
        for (key, value) in data.dtypes.items():
            if (str(value) == 'object' and data[key].nunique() < 10):
                tipos.append(key)

        # Creamos el histograma
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
        return False


@app.get("/EDA/DataCorrelacion")
async def dataCorrelacion():
    # Dataframe
    global data

    # Verificamos que este cargado un proyecto
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
        return False


@app.get("/EDA/DataCorrelacion/Mapa")
async def dataCorrelacionMapa():
    # Dataframe
    global data

    # Verificamos que este cargado un proyecto
    if not data.empty:
        # Obtenemos columnas
        columnas = data.corr().columns.tolist()

        # Lista que contendra las filas
        filas = data.corr().values.tolist()

        # Lista que contendra la matriz de correlaciones
        mapa = []

        # Damos formato a los datos
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
        return False

# Funciones de PCA

@app.post("/PCA/Estandar") 
async def pcaEstandar(metodo: str = Form(...)):
    # Dataframe
    global data

    # Variables de PCA
    global MEstandarizada
    global dataSinObjectNan

    # Verificamos que este cargado un proyecto
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

        # Creamos la tabla
        return creaTabla(tmp,True)
    else:
        return False

@app.post("/PCA/Componentes")
async def pcaComponentes(numero: str = Form(...)):
    # Dataframe
    global data

    # Variables de PCA
    global MEstandarizada
    global pca

    # Convertimos el valor de número
    if numero == "None":
        numero = None
    else:
        numero = int(numero)

    # Verificamos que este cargado un proyecto
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
        return False

@app.get("/PCA/grafica/varianza")
async def pcaGraficaVarianza():
    # Dataframe
    global data

    # Variables de PCA
    global MEstandarizada

    # Verificamos que este cargado un proyecto
    if not data.empty:
        # Obtenemos el PCA
        pca = PCA(n_components=None)
        pca.fit(MEstandarizada)

        # Obtenemos la varianza
        listaVarianza = pca.explained_variance_ratio_.tolist()

        # Creamos los elementos de la grafica
        dic = {"id":"varianza"}
        dat = []

        for i in range(len(listaVarianza)):
            tmp={}
            tmp["x"] = i
            if(i != 0):
                tmp["y"] = tmp["y"] = dat[i-1]["y"] + listaVarianza[i]
            else:
                tmp["y"] = listaVarianza[i]

            dat.append(tmp)

        dic["data"] = dat

        # Retornamos el diccionario
        return [dic]
    else:
        return False

@app.post("/PCA/Varianza")
async def pcaVarianza(numero: int = Form(...)):
    # Dataframe
    global data

    # Variables de PCA
    global MEstandarizada
    global pca

    # Verificamos que este cargado un proyecto
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
        return False

@app.post("/PCA/Paso6") 
async def pcaPaso6(numero: int = Form(...)):
    # Dataframe
    global data

    # Variable de PCA
    global pca

    # Verificamos que este cargado un proyecto
    if not data.empty:
        cargasComponentes = pd.DataFrame(
            abs(pca.components_), columns=dataSinObjectNan.columns)

        # Creamos tabla con todos los elementos
        tablaCompleta = creaTabla(cargasComponentes,False)

        # Creamos tabla con el head
        tablaHead = creaTabla(cargasComponentes.head(numero),False)

        # Retornamos las tablas
        return tablaCompleta + tablaHead

    else:
        return False

@app.get("/PCA/trae/Variables")
async def pcaTraeVariables():
    # Dataframe
    global data

    # Verificamos que este cargado un proyecto
    if not data.empty:

        # Obtenemos columnas
        variables = data.columns.values.tolist()

        # Retornamos los elementos
        return variables
    else:
        return False


@app.post("/PCA/Drop") 
async def pcaDrop(lista: list = Form(...)):
    # Dataframe
    global data

    # Dataframe de apoyo
    global dataDrop

    # Verificamos que este cargado un proyecto
    if not data.empty:
        # Eliminamos la variable
        if lista != [""]:
            lista = lista[0].split(',')
            dataDrop = data.drop(columns=lista)
        else:
            dataDrop = data

        # Por si eliminan todos los elementos
        if (dataDrop.empty):
            dataDrop = data

        # Creamos la tabla
        return creaTabla(dataDrop,True)

    else:
        return False


# Pronostico
@app.get("/Pronostico/trae/Variables")
async def traeVariables():
    # Dataframe
    global data

    # Verificamos que este cargado un proyecto
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
        return False

@app.post("/Pronostico/Drop") 
async def drop(lista: list = Form(...)):
    # Dataframe
    global data

    # Datafram de apoyo
    global dataDrop

    # Verificamos que este cargado un proyecto
    if not data.empty:
        # Eliminamos la variable
        if lista != [""]:
            lista = lista[0].split(',')
            dataDrop = data.drop(columns=lista)
        else:
            dataDrop = data

        # Por si eliminan todos los elementos
        if (dataDrop.empty):
            dataDrop = data

        # Limpiamos el conjunto de variables categoricas y datos Nan
        dataTmp = dataDrop

        for (key, value) in dataDrop.dtypes.items():
            if (str(value) == 'object'):
                dataTmp = dataTmp.drop(columns=[key])

        dataDrop = dataTmp.dropna()

        # Creamos la tabla
        return creaTabla(dataDrop,True)
    else:
        return False

@app.get("/Pronostico/trae/Variables/Seleccion")
async def traeVariablesSeleccion():
    # Dataframe
    global data

    # Dataframe de apoyo
    global dataDrop

    # Verificamos que este cargado un proyecto
    if not data.empty:

        # Obtenemos columnas
        variables = dataDrop.columns.values.tolist()

        # Retornamos los elementos
        return variables
    else:
        return False

@app.post("/Pronostico/Entrenamiento")
async def entrenamiento(algoritmo: str = Form(...), test_size: str = Form(...), random_state_division: str = Form(...), \
    n_estimators: str = Form(...), max_depth: str = Form(...), min_samples_split: str = Form(...), \
    min_samples_leaf: str = Form(...), random_state: str = Form(...)):
    
    # Variables
    global data

    # Variables de Arboles
    global PronosticoAD
    global X
    global Y

    # Variables de Bosques
    global PronosticoBA
    global XB
    global YB

    if not data.empty:

        if max_depth == "None":
            max_depth = None
        else:
            max_depth = int(max_depth)

        if(algoritmo == "arbol"):
            # Divisón de datos
            X_train, X_test, Y_train, Y_test = model_selection.train_test_split(
                X, Y, test_size=float(test_size), random_state=int(random_state_division), shuffle=True)

            PronosticoAD = DecisionTreeRegressor(
            max_depth=max_depth, min_samples_split=int(min_samples_split), 
            min_samples_leaf=int(min_samples_leaf), random_state=int(random_state))

            PronosticoAD.fit(X_train, Y_train)

            # Se genera el pronóstico
            Y_Pronostico = PronosticoAD.predict(X_test)

            # Criterio
            criterio = PronosticoAD.criterion

        else:
            # Divisón de datos
            X_train, X_test, Y_train, Y_test = model_selection.train_test_split(
                XB, YB, test_size=float(test_size), random_state=int(random_state_division), shuffle=True)

            PronosticoBA = RandomForestRegressor(n_estimators=int(n_estimators),
            max_depth=max_depth, min_samples_split=int(min_samples_split), 
            min_samples_leaf=int(min_samples_leaf), random_state=int(random_state))

            PronosticoBA.fit(X_train, Y_train)

            # Se genera el pronóstico
            Y_Pronostico = PronosticoBA.predict(X_test)

            # Criterio
            criterio = PronosticoBA.criterion

        # Medidas
        return [criterio,
                mean_absolute_error(Y_test, Y_Pronostico),
                mean_squared_error(Y_test, Y_Pronostico),
                mean_squared_error(Y_test, Y_Pronostico, squared=False),
                r2_score(Y_test, Y_Pronostico)]

    else:
        return False

@app.post("/Pronostico/nuevoPronostico")
async def nuevoPronostico(algoritmo: str = Form(...), lista: list = Form(...)):
    # Dataframe
    global data

    # Arboles
    global PronosticoAD

    # Bosques
    global PronosticoBA

    if not data.empty:
        if lista != [""]:
            lista = lista[0].split(',')
        else:
            return False

        diccionario = {}

        for i in range(0, len(lista)):
            if i % 2 == 0:
                diccionario[lista[i]] = [float(lista[i+1])]
            else:
                continue

        pronostico = pd.DataFrame(diccionario)

        if(algoritmo == "arbol"):
            return (PronosticoAD.predict(pronostico).tolist())[0]
        else:
            return (PronosticoBA.predict(pronostico).tolist())[0]

    else:
        return False

@app.post("/Pronostico/importancia")
async def importancia(algoritmo: str = Form(...), lista: list = Form(...)):
    # Dataframe
    global data

    # Variables
    global PronosticoAD
    global PronosticoBA

    # Verificamos que este cargado un proyecto
    if not data.empty:
        if lista != [""]:
            lista = lista[0].split(',')
        else:
            return False


        # Creamos la matriz
        if(algoritmo == "arbol"):
            importancia = pd.DataFrame({'Variable': list(data[lista]),
            'Importancia': PronosticoAD.feature_importances_}).sort_values('Importancia', ascending=False)
        else:
            importancia = pd.DataFrame({'Variable': list(data[lista]),
            'Importancia': PronosticoBA.feature_importances_}).sort_values('Importancia', ascending=False)


        # Obtenemos las columnas y filas
        columnas = importancia.columns.values.tolist()
        filas = importancia.values.tolist()

        return[columnas,filas]

    else:
        return False

# Pronostico arboles
@app.post("/Pronostico/Arboles/seleccion")
async def arbolesSeleccion(lista: list = Form(...), seleccion: str = Form(...)):
    # Dataframe
    global data

    # Dataframe de poyo
    global dataDrop

    # Variables de Árboles
    global X
    global Y

    # Verificamos que este cargado un proyecto
    if not data.empty:
        # Convertimos en lista
        if lista != [""]:
            lista = lista[0].split(',')
        else:
            return False

        if(seleccion == "x"):
            # Guardamos la seleccion de X
            X = np.array(dataDrop[lista])

            tmp = pd.DataFrame(X)
        else:
            # Guardamos la seleccion de Y
            Y = np.array(dataDrop[lista[0]])

            tmp = pd.DataFrame(Y)       

        # Creamos la tabla
        return creaTabla(tmp,True)
    else:
        return False

# Pronostico Bosques
@app.post("/Pronostico/Bosques/seleccion")
async def bosquesSeleccion(lista: list = Form(...), seleccion: str = Form(...)):
    # Dataframe
    global data

    # Dataframe de apoyo
    global dataDrop

    # Variables de bosques
    global XB
    global YB

    # Verificamos que este cargado un proyecto
    if not data.empty:
        # Convertimos en lista
        if lista != [""]:
            lista = lista[0].split(',')
        else:
            return False

        if(seleccion == "x"):
            # Guardamos la seleccion de X
            XB = np.array(dataDrop[lista])

            tmp = pd.DataFrame(XB)
        else:
            # Guardamos la seleccion de Y
            YB = np.array(dataDrop[lista[0]])

            tmp = pd.DataFrame(YB)       

        # Creamos la tabla
        return creaTabla(tmp,True)
    else:
        return False


# Clasificación
@app.get("/Clasificacion/trae/Variables")
async def traeVariables():
    # Dataframe
    global data

    # Verificamos que este cargado un proyecto
    if not data.empty:

        # Obtenemos columnas
        variables = data.columns.values.tolist()

        # Retornamos los elementos
        return variables
    else:
        return False

@app.post("/Clasificacion/Entrenamiento")
async def entrenamiento(algoritmo: str = Form(...), test_size: str = Form(...), random_state_division: str = Form(...), \
    n_estimators: str = Form(...), max_depth: str = Form(...), min_samples_split: str = Form(...), \
    min_samples_leaf: str = Form(...), random_state: str = Form(...)):
    # Variables
    global data
    global X_validation
    global Y_validation

    # Variables de Arboles
    global ClasificacionAD
    global X
    global Y

    # Variables de Bosques
    global ClasificacionBA
    global XB
    global YB

    # Verificamos que este cargado un proyecto
    if not data.empty:

        if max_depth == "None":
            max_depth = None
        else:
            max_depth = int(max_depth)

        if(algoritmo == "arbol"):
            # Divisón de datos
            X_train, X_validation, Y_train, Y_validation = model_selection.train_test_split(X, Y, 
                test_size = float(test_size), random_state = int(random_state_division), shuffle = True)


            ClasificacionAD = DecisionTreeClassifier(max_depth=max_depth, 
                                                    min_samples_split=int(min_samples_split), 
                                                    min_samples_leaf=int(min_samples_leaf),
                                                    random_state=int(random_state))
            ClasificacionAD.fit(X_train, Y_train)

            # Se genera la clasificación
            Y_Clasificacion = ClasificacionAD.predict(X_validation)

            # Criterio
            criterio = ClasificacionAD.criterion

        else:
            # Divisón de datos
            X_train, X_validation, Y_train, Y_validation = model_selection.train_test_split(XB, YB, 
                test_size = float(test_size), random_state = int(random_state_division), shuffle = True)


            ClasificacionBA = RandomForestClassifier(n_estimators=int(n_estimators),
                                         max_depth=max_depth, 
                                         min_samples_split=int(min_samples_split), 
                                         min_samples_leaf=int(min_samples_leaf), 
                                         random_state=int(random_state))
            ClasificacionBA.fit(X_train, Y_train)

            # Se genera el pronóstico
            Y_Clasificacion = ClasificacionBA.predict(X_validation)

            # Criterio
            criterio = ClasificacionBA.criterion

        # Medidas
        return [criterio, accuracy_score(Y_validation, Y_Clasificacion)]

    else:
        return False

@app.post("/Clasificacion/nuevaClasificacion")
async def nuevaClasificacion(algoritmo: str = Form(...), lista: list = Form(...)):
    # Dataframe
    global data

    # Arboles
    global ClasificacionAD

    # Bosques
    global ClasificacionBA

    if not data.empty:
        if lista != [""]:
            lista = lista[0].split(',')
        else:
            return False

        diccionario = {}

        for i in range(0, len(lista)):
            if i % 2 == 0:
                diccionario[lista[i]] = [float(lista[i+1])]
            else:
                continue

        clasificacion = pd.DataFrame(diccionario)

        if(algoritmo == "arbol"):
            return (ClasificacionAD.predict(clasificacion).tolist())[0]
        else:
            return (ClasificacionBA.predict(clasificacion).tolist())[0]

    else:
        return False

@app.post("/Clasificacion/size")
async def size(variable: str = Form(...)):
    # Dataframe
    global data

    # Verificamos que este cargado un proyecto
    if not data.empty:
        # Creamos la tabla
        df = data.groupby(variable).size()

        return creaTablaSeries(df,variable,"Cuenta")
    else:
        return False

@app.post("/Clasificacion/matriz")
async def matriz(algoritmo: str = Form(...)):
    # Dataframe
    global data

    # Variables
    global X_validation
    global Y_validation
    global ClasificacionAD
    global ClasificacionBA

    # Verificamos que este cargado un proyecto
    if not data.empty:

        # Creamos la matriz
        if(algoritmo == "arbol"):
            modelo = ClasificacionAD.predict(X_validation)
        else:
            modelo = ClasificacionBA.predict(X_validation)

        matriz = pd.crosstab(Y_validation.ravel(),modelo,
        rownames=["Reales"],colnames=["Clasificación"])


        # Obtenemos las columnas y filas
        columnas = matriz.columns.values.tolist()
        filas = matriz.values.tolist()

        # Agregamos la etiquetas
        for i in range(len(columnas)):
            filas[i].insert(0,columnas[i])

        # Agregamos una columna vacia para las etiquetas
        if columnas[0] != "":
            columnas.insert(0, "")

        return[columnas,filas]

    else:
        return False

@app.post("/Clasificacion/importancia")
async def importancia(algoritmo: str = Form(...), lista: list = Form(...)):
    # Dataframe
    global data

    # Variables
    global ClasificacionAD
    global ClasificacionBA

    # Verificamos que este cargado un proyecto
    if not data.empty:
        if lista != [""]:
            lista = lista[0].split(',')
        else:
            return False


        # Creamos la matriz
        if(algoritmo == "arbol"):
            importancia = pd.DataFrame({'Variable': list(data[lista]),
            'Importancia': ClasificacionAD.feature_importances_}).sort_values('Importancia', ascending=False)
        else:
            importancia = pd.DataFrame({'Variable': list(data[lista]),
            'Importancia': ClasificacionBA.feature_importances_}).sort_values('Importancia', ascending=False)


        # Obtenemos las columnas y filas
        columnas = importancia.columns.values.tolist()
        filas = importancia.values.tolist()

        return[columnas,filas]

    else:
        return False

# Clasificación árboles
@app.post("/Clasificacion/Arboles/seleccion")
async def arbolesSeleccion(lista: list = Form(...), seleccion: str = Form(...)):
    # Dataframe
    global data

    # Variables de Árboles
    global X
    global Y

    # Verificamos que este cargado un proyecto
    if not data.empty:
        # Convertimos en lista
        if lista != [""]:
            lista = lista[0].split(',')
        else:
            return False

        if(seleccion == "x"):
            # Guardamos la seleccion de X
            X = np.array(data[lista])

            tmp = pd.DataFrame(X)
        else:
            # Guardamos la seleccion de Y
            Y = np.array(data[lista[0]])

            tmp = pd.DataFrame(Y)       

        # Creamos la tabla
        return creaTabla(tmp,True)
    else:
        return False

# Clasificacion Bosques
@app.post("/Clasificacion/Bosques/seleccion")
async def bosquesSeleccion(lista: list = Form(...), seleccion: str = Form(...)):
    # Dataframe
    global data

    # Variables de bosques
    global XB
    global YB

    # Verificamos que este cargado un proyecto
    if not data.empty:
        # Convertimos en lista
        if lista != [""]:
            lista = lista[0].split(',')
        else:
            return False

        if(seleccion == "x"):
            # Guardamos la seleccion de X
            XB = np.array(data[lista])

            tmp = pd.DataFrame(XB)
        else:
            # Guardamos la seleccion de Y
            YB = np.array(data[lista[0]])

            tmp = pd.DataFrame(YB)       

        # Creamos la tabla
        return creaTabla(tmp,True)
    else:
        return False

# Hibridos

@app.get("/K-means/Estandar") 
async def estandar():
    # Dataframe
    global data

    # Variables
    global dataDrop
    global MEstandarizada

    # Verificamos que este cargado un proyecto
    if not data.empty:

        Estandarizar = StandardScaler()

        # Estandarizamos
        MEstandarizada = Estandarizar.fit_transform(dataDrop)

        # Creamos un dataframe temporal para mostrar
        tmp = pd.DataFrame(MEstandarizada, columns=dataDrop.columns)

        # Creamos la tabla
        return creaTabla(tmp,True)
    else:
        return False

@app.post("/K-means/grafica")
async def grafica(maximo: int = Form(...)):
    # Dataframe
    global data

    # Variables
    global MEstandarizada
    global SSE


    # Verificamos que este cargado un proyecto
    if not data.empty:
        #Definición de k clusters para K-means
        SSE = []
        for i in range(2, maximo):
            km = KMeans(n_clusters=i, random_state=0)
            km.fit(MEstandarizada)
            SSE.append(km.inertia_)

        # Creamos los elementos de la grafica
        dic = {"id":"SSE"}
        dat = []

        for i in range(2, maximo):
            tmp={}
            tmp["x"] = i
            tmp["y"] = SSE[i-2]

            dat.append(tmp)

        dic["data"] = dat

        # Retornamos el diccionario
        return [dic]
    else:
        return False

@app.post("/K-means/KneeLocator")
async def kneeLocator(maximo: int = Form(...), curve: str = Form(...), direction: str = Form(...)):
    # Dataframe
    global data

    # variables
    global SSE
    global Knee

    # Verificamos que este cargado un proyecto
    if not data.empty:
        kl = KneeLocator(range(2, maximo), SSE, curve=curve, direction=direction)
        Knee = kl.elbow
        return str(Knee)

    else:
        return False

@app.get("/K-means/Etiquetas")
async def etiquetas():
    # Dataframe
    global data

    # variables
    global Knee
    global MEstandarizada
    global dataDrop

    # Verificamos que este cargado un proyecto
    if not data.empty:
        #Se crean las etiquetas de los elementos en los clusters
        MParticional = KMeans(n_clusters=Knee, random_state=0).fit(MEstandarizada)
        MParticional.predict(MEstandarizada)
        MParticional.labels_
        dataDrop['clusterP'] = MParticional.labels_

        # Creamos la tabla con las etiquetas
        listaEtiquetas = creaTabla(dataDrop,True)

        # Contamos el número de elementos por cluster
        cuenta = dataDrop.groupby(['clusterP'])['clusterP'].count()

        # Creamos la tabla de la serie

        listaCuenta = creaTablaSeries(cuenta,"clusterP","Cuenta")

        # Obtención de los centroides
        CentroidesP = dataDrop.groupby('clusterP').mean()

        # Tabla de centroides

        listaCentroide = creaTabla(CentroidesP,False)

        listaCentroide[0][0] = "clusterP"

        return listaEtiquetas + listaCuenta + listaCentroide
    else:
        return False

@app.post("/Clasificacion/Multiple/Bosques/seleccion")
async def bosquesSeleccion(lista: list = Form(...), seleccion: str = Form(...)):
    # Dataframe
    global data

    # Variables de bosques
    global XB
    global YB

    # Verificamos que este cargado un proyecto
    if not data.empty:
        # Convertimos en lista
        if lista != [""]:
            lista = lista[0].split(',')
        else:
            return False

        if(seleccion == "x"):
            # Guardamos la seleccion de X
            XB = np.array(dataDrop[lista])

            tmp = pd.DataFrame(XB)
        else:
            # Guardamos la seleccion de Y
            YB = np.array(dataDrop[lista[0]])

            tmp = pd.DataFrame(YB)       

        # Creamos la tabla
        return creaTabla(tmp,True)
    else:
        return False


# SVM
@app.post("/SVM/Entrenamiento")
async def entrenamiento(kernel: str = Form(...), test_size: str = Form(...), random_state: str = Form(...), \
    degree: str = Form(...)):
    # Variables
    global data
    global X_validation
    global Y_validation

    # Variables de SVM
    global ModeloSVM
    global X
    global Y

    # Verificamos que este cargado un proyecto
    if not data.empty:

        # Divisón de datos
        X_train, X_validation, Y_train, Y_validation = model_selection.train_test_split(X, Y, 
            test_size = float(test_size), random_state = int(random_state), shuffle = True)

        # Se crea el modelo
        if kernel == "linear" or kernel == "rbf" or "sigmoid":
            ModeloSVM = SVC(kernel=kernel)
        elif kernel == "poly":
            ModeloSVM = SVC(kernel=kernel,degree=int(degree))
        
        ModeloSVM.fit(X_train, Y_train)

        # Medidas
        return [ModeloSVM.score(X_validation, Y_validation),ModeloSVM.n_support_.tolist()]

    else:
        return False

@app.get("/SVM/matriz")
async def matriz():
    # Dataframe
    global data

    # Variables
    global X_validation
    global Y_validation
    global ModeloSVM

    # Verificamos que este cargado un proyecto
    if not data.empty:

        Clasificaciones = ModeloSVM.predict(X_validation)
        matriz = pd.crosstab(Y_validation.ravel(), 
            Clasificaciones, rownames=['Real'], colnames=['Clasificación']) 


        # Obtenemos las columnas y filas
        columnas = matriz.columns.values.tolist()
        filas = matriz.values.tolist()

        # Agregamos la etiquetas
        for i in range(len(columnas)):
            filas[i].insert(0,columnas[i])

        # Agregamos una columna vacia para las etiquetas
        if columnas[0] != "":
            columnas.insert(0, "")

        return[columnas,filas]

    else:
        return False

@app.get("/SVM/vectoresSoporte")
async def matriz():
    # Dataframe
    global data

    # Variables
    global ModeloSVM

    # Verificamos que este cargado un proyecto
    if not data.empty:
        vectores = ModeloSVM.support_vectors_
        return creaTabla(pd.DataFrame(vectores),True)

    else:
        return False

@app.post("/SVM/nuevaClasificacion")
async def nuevaClasificacion(lista: list = Form(...)):
    # Dataframe
    global data

    # Modelo
    global ModeloSVM

    if not data.empty:
        if lista != [""]:
            lista = lista[0].split(',')
        else:
            return False

        diccionario = {}

        for i in range(0, len(lista)):
            if i % 2 == 0:
                diccionario[lista[i]] = [float(lista[i+1])]
            else:
                continue

        clasificacion = pd.DataFrame(diccionario)

        return (ModeloSVM.predict(clasificacion).tolist())[0]

    else:
        return False

# Funciones de control

@app.post("/crear/Proyecto")
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
