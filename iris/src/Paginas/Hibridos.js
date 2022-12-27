//Bibliotecas
import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Typography, Grid, Box } from "@mui/material";

// Componentes
import Tabla from "../Componentes/Mostrar datos/Tabla";
import CodigoBoton from "../Componentes/Mostrar datos/CodigoBoton";
import Visualizador from "../Componentes/Editores/Visualizador";
import Comando from "../Componentes/Editores/Comando";
import Selector from "../Componentes/Editores/Selector";

// Graficas
import HeatMap from "../Graficas/HeatMap";

// Estilos
const Titulo = styled(Typography)({
  color: "black",
  fontWeight: "bold",
  fontFamily: "Roboto",
  fontSize: "30px",
});

const Subtitulo = styled(Typography)({
  color: "black",
  fontWeight: "bold",
  fontFamily: "Roboto",
  fontSize: "20px",
});

const Bold = styled(Typography)({
  color: "black",
  fontWeight: "bold",
  fontFamily: "Roboto",
});

const Parrafo = styled(Typography)({
  textAlign: "justify",
  fontFamily: "Roboto",
});

export default function Hibridos() {
  // Comandos de EDA

  // Vista Previa
  const [dataVistaPrevia, setDataVistaPrevia] = useState([[], []]);
  const [visibleVistaPrevia, setVisibleVistaPrevia] = useState(false);

  // Descripción de variables
  const [datosFaltantesNull, setDatosFaltantesNull] = useState([[], []]);
  const [visibleFaltantesNull, setVisibleFaltantesNull] = useState(false);
  const [dataDescribe, setDataDescribe] = useState([[], []]);
  const [visibleDescribe, setVisibleDescribe] = useState(false);
  const [dataDescribeObject, setDataDescribeObject] = useState([[], []]);
  const [visibleDescribeObject, setVisibleDescribeObject] = useState(false);

  const [variableSize, setVariableSize] = useState("");
  const [tablaSize, setTablaSize] = useState([[], []]);
  const [visibleTablaSize, setVisibleTablaSize] = useState(false);

  // Selección de características
  const [dataCorrelacion, setDataCorrelacion] = useState([[], []]);
  const [visibleDataCorrelacion, setVisibleDataCorrelacion] = useState(false);
  const [dataCorrelacionMapa, setDataCorrelacionMapa] = useState([]);
  const [visibleDataCorrelacionMapa, setVisibleDataCorrelacionMapa] =
    useState(false);

  // Limpieza de datos
  const [variables, setVariables] = useState([]);
  const [tablaDrop, setTablaDrop] = useState([]);
  const [visibleTablaDrop, setVisibleTablaDrop] = useState(false);
  const [variablesDrop, setVariablesDrop] = useState([]);

  // K-means
  const [tablaMetodo, setTablaMetodo] = useState([[], []]);
  const [visibleTablaMetodo, setVisibleTablaMetodo] = useState(false);

  // Clasificación Árboles
  const [variablesX, setVariablesX] = useState([]);

  // Matriz de clasificación árboles
  const [matriz, setMatriz] = useState([[], []]);
  const [visibleMatriz, setVisibleMatriz] = useState(false);

  // Importancia
  const [tablaImportancia, setTablaImportancia] = useState([[], []]);
  const [visibleTablaImportancia, setVisibleTablaImportancia] = useState(false);

  // Variables de Clasificación de Árboles
  const [variablesNuevaClasificacion] = useState(variablesX);
  const [nuevaClasificacionLabel, setNuevaClasificacionLabel] = useState("");
  const [nuevaClasificacionValue, setNuevaClasificacionValue] = useState("");
  const [nuevaClasificacionLista, setNuevaClasificacionLista] = useState([]);
  const [nuevaClasificacion, setNuevaClasificacion] = useState([]);
  const [visibleNuevaClasificacion, setVisibleNuevaClasificacion] =
    useState(false);

  // Clasificación Bosques
  const [variablesXB, setVariablesXB] = useState([]);
  const [tablaXB, setTablaXB] = useState([]);
  const [visibleTablaXB, setVisibleTablaXB] = useState(false);
  const [variableYB, setVariableYB] = useState([]);
  const [tablaYB, setTablaYB] = useState([]);
  const [visibleTablaYB, setVisibleTablaYB] = useState(false);

  // Configuración de Bosques
  const [n_estimatorsB, setN_estimatorsB] = useState("100");
  const [max_depthB, setMax_depthB] = useState("None");
  const [min_samples_splitB, setMin_samples_splitB] = useState("2");
  const [min_samples_leafB, setMin_samples_leafB] = useState("1");
  const [random_stateB, setRandom_stateB] = useState("0");
  const [clasificacionMedidasB, setClasificacionMedidasB] = useState([]);
  const [visibleClasificacionMedidasB, setVisibleClasificacionMedidasB] =
    useState(false);

  // Matriz de clasificación bosques
  const [matrizB, setMatrizB] = useState([[], []]);
  const [visibleMatrizB, setVisibleMatrizB] = useState(false);

  // Importancia de bosques
  const [tablaImportanciaB, setTablaImportanciaB] = useState([[], []]);
  const [visibleTablaImportanciaB, setVisibleTablaImportanciaB] =
    useState(false);

  // Variables de Clasificación de Árboles
  const [variablesNuevaClasificacionB] = useState(variablesXB);
  const [nuevaClasificacionLabelB, setNuevaClasificacionLabelB] = useState("");
  const [nuevaClasificacionValueB, setNuevaClasificacionValueB] = useState("");
  const [nuevaClasificacionListaB, setNuevaClasificacionListaB] = useState([]);
  const [nuevaClasificacionB, setNuevaClasificacionB] = useState([]);
  const [visibleNuevaClasificacionB, setVisibleNuevaClasificacionB] =
    useState(false);

  useEffect(() => {
    traeVariables();
    // eslint-disable-next-line
  }, []);

  // Vista Previa
  function vistaPrevia() {
    var requestOptions = {
      method: "GET",
    };

    fetch("http://127.0.0.1:8000/vistaPrevia", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        if (result !== false) {
          setDataVistaPrevia([result[0], result[1]]);
          setVisibleVistaPrevia(true);
        } else {
          alert("Carga un proyecto");
        }
      })
      .catch((error) => console.log("error", error));
  }

  // Descripción de variables
  function getdatosFaltantesNull() {
    var requestOptions = {
      method: "GET",
    };

    fetch("http://127.0.0.1:8000/EDA/DatosFaltantesNull", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        if (result !== false) {
          setDatosFaltantesNull([result[0], result[1]]);
          setVisibleFaltantesNull(true);
        } else {
          alert("Carga un proyecto");
        }
      })
      .catch((error) => console.log("error", error));
  }

  function getDataDescribe() {
    var requestOptions = {
      method: "GET",
    };

    fetch("http://127.0.0.1:8000/EDA/DataDescribe", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        if (result !== false) {
          setDataDescribe(result);
          setVisibleDescribe(true);
        } else {
          alert("Carga un proyecto");
        }
      })
      .catch((error) => console.log("error", error));
  }

  function getDataDescribeObject() {
    var requestOptions = {
      method: "GET",
    };

    fetch("http://127.0.0.1:8000/EDA/DataDescribe/Object", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        if (result !== false) {
          setDataDescribeObject(result);
          setVisibleDescribeObject(true);
        } else {
          alert("Carga un proyecto");
        }
      })
      .catch((error) => console.log("error", error));
  }

  function getSize() {
    if (variableSize !== "") {
      // Ingresamos los datos
      const formdata = new FormData();
      formdata.append("variable", variableSize);

      var requestOptions = {
        method: "POST",
        body: formdata,
      };

      fetch("http://127.0.0.1:8000/Clasificacion/size", requestOptions)
        .then((response) => {
          return response.json();
        })
        .then((result) => {
          if (result !== false) {
            setTablaSize(result);
            setVisibleTablaSize(true);
          }
        })
        .catch((error) => console.log("error", error));
    } else {
      alert("Selecciona una variable");
    }
  }

  // Selección de características
  function getDataCorrelacion() {
    var requestOptions = {
      method: "GET",
    };

    fetch("http://127.0.0.1:8000/EDA/DataCorrelacion", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        if (result !== false) {
          setDataCorrelacion(result);
          setVisibleDataCorrelacion(true);
        } else {
          alert("Carga un proyecto");
        }
      })
      .catch((error) => console.log("error", error));
  }

  function getDataCorrelacionMapa() {
    var requestOptions = {
      method: "GET",
    };

    fetch("http://127.0.0.1:8000/EDA/DataCorrelacion/Mapa", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        if (result !== false) {
          setDataCorrelacionMapa(result);
          setVisibleDataCorrelacionMapa(true);
        } else {
          alert("Carga un proyecto");
        }
      })
      .catch((error) => console.log("error", error));
  }

  // Limpieza de datos
  function traeVariables() {
    var requestOptions = {
      method: "GET",
    };

    fetch("http://127.0.0.1:8000/Clasificacion/trae/Variables", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        if (result !== false) {
          setVariables(result);
        }
      })
      .catch((error) => console.log("error", error));
  }

  function getDataDrop() {
    // Ingresamos los datos
    const formdata = new FormData();
    formdata.append("lista", variablesDrop);

    var requestOptions = {
      method: "POST",
      body: formdata,
    };

    fetch("http://127.0.0.1:8000/Pronostico/Drop", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        if (result !== false) {
          setTablaDrop([result[0], result[1]]);
          setVisibleTablaDrop(true);
        } else {
          alert("Carga un proyecto");
        }
      })
      .catch((error) => console.log("error", error));
  }

  // K-means
  function estandarizacion() {
    var requestOptions = {
      method: "GET",
    };

    fetch("http://127.0.0.1:8000/K-means/Estandar", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        if (result !== false) {
          setTablaMetodo([result[0], result[1]]);
          setVisibleTablaMetodo(true);
        } else {
          alert("Carga un proyecto");
        }
      })
      .catch((error) => console.log("error", error));
  }

  // Clasificación Árboles

  function clasificacionMatriz() {
    // Ingresamos los datos
    const formdata = new FormData();
    formdata.append("algoritmo", "arbol");

    var requestOptions = {
      method: "POST",
      body: formdata,
    };

    fetch("http://127.0.0.1:8000/Clasificacion/matriz", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        if (result !== false) {
          setMatriz(result);
          setVisibleMatriz(true);
        } else {
          alert("Carga un proyecto");
        }
      })
      .catch((error) => console.log("error", error));
  }

  function getImportancia() {
    // Ingresamos los datos
    const formdata = new FormData();
    formdata.append("algoritmo", "arbol");
    formdata.append("lista", variablesX);

    var requestOptions = {
      method: "POST",
      body: formdata,
    };

    fetch("http://127.0.0.1:8000/Clasificacion/importancia", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        if (result !== false) {
          setTablaImportancia(result);
          setVisibleTablaImportancia(true);
        } else {
          alert("Carga un proyecto");
        }
      })
      .catch((error) => console.log("error", error));
  }

  function guardaValorClasificacion() {
    // Actualzamos la lista
    let lista = nuevaClasificacionLista;
    let index = -1;
    let tam = lista.length;

    for (let i = 0; i < tam; i++) {
      if (lista[i][0] === nuevaClasificacionLabel) {
        index = i;
        break;
      }
    }

    if (index === -1) {
      alert("Se registro el valor de: " + nuevaClasificacionLabel);
      lista.push([nuevaClasificacionLabel, nuevaClasificacionValue]);
    } else {
      alert("Se actualizo el valor de: " + nuevaClasificacionLabel);
      lista[index] = [nuevaClasificacionLabel, nuevaClasificacionValue];
    }

    setNuevaClasificacionLista(lista);
  }

  function getNuevaClasificacion() {
    // Ingresamos los datos
    const formdata = new FormData();
    formdata.append("algoritmo", "arbol");
    formdata.append("lista", nuevaClasificacionLista);

    var requestOptions = {
      method: "POST",
      body: formdata,
    };

    fetch(
      "http://127.0.0.1:8000/Clasificacion/nuevaClasificacion",
      requestOptions
    )
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        if (result !== false) {
          setNuevaClasificacion(result);
          setVisibleNuevaClasificacion(true);
        } else {
          alert("Carga un proyecto");
        }
      })
      .catch((error) => console.log("error", error));
  }

  // Clasificación Bosques

  function seleccionBosques(letra) {
    // Ingresamos los datos
    const formdata = new FormData();
    if (letra === "x") {
      formdata.append("lista", variablesXB);
    } else {
      formdata.append("lista", variableYB);
    }

    formdata.append("seleccion", letra);

    var requestOptions = {
      method: "POST",
      body: formdata,
    };

    fetch(
      "http://127.0.0.1:8000/Clasificacion/Bosques/seleccion",
      requestOptions
    )
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        if (result !== false) {
          if (letra === "x") {
            setTablaXB([result[0], result[1]]);
            setVisibleTablaXB(true);
          } else {
            setTablaYB([result[0], result[1]]);
            setVisibleTablaYB(true);
          }
        } else {
          alert("Selecciona alguna variable.");
        }
      })
      .catch((error) => console.log("error", error));
  }

  function seleccionaXB() {
    seleccionBosques("x");
  }

  function seleccionaYB() {
    seleccionBosques("y");
  }

  function clasificacionEntrenamientoB() {
    // Ingresamos los datos
    const formdata = new FormData();
    formdata.append("algoritmo", "bosque");
    formdata.append("n_estimators", n_estimatorsB);
    formdata.append("max_depth", max_depthB);
    formdata.append("min_samples_split", min_samples_splitB);
    formdata.append("min_samples_leaf", min_samples_leafB);
    formdata.append("random_state", random_stateB);

    var requestOptions = {
      method: "POST",
      body: formdata,
    };

    fetch("http://127.0.0.1:8000/Clasificacion/Entrenamiento", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        if (result !== false) {
          setClasificacionMedidasB(result);
          setVisibleClasificacionMedidasB(true);
        } else {
          alert("Favor de revisar si realizo todos los pasos anteriores.");
        }
      })
      .catch((error) => console.log("error", error));
  }

  function clasificacionMatrizB() {
    // Ingresamos los datos
    const formdata = new FormData();
    formdata.append("algoritmo", "bosque");

    var requestOptions = {
      method: "POST",
      body: formdata,
    };

    fetch("http://127.0.0.1:8000/Clasificacion/matriz", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        if (result !== false) {
          setMatrizB(result);
          setVisibleMatrizB(true);
        } else {
          alert("Carga un proyecto");
        }
      })
      .catch((error) => console.log("error", error));
  }

  function getImportanciaB() {
    // Ingresamos los datos
    const formdata = new FormData();
    formdata.append("algoritmo", "bosque");
    formdata.append("lista", variablesXB);

    var requestOptions = {
      method: "POST",
      body: formdata,
    };

    fetch("http://127.0.0.1:8000/Clasificacion/importancia", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        if (result !== false) {
          setTablaImportanciaB(result);
          setVisibleTablaImportanciaB(true);
        } else {
          alert("Carga un proyecto");
        }
      })
      .catch((error) => console.log("error", error));
  }

  function guardaValorClasificacionB() {
    // Actualzamos la lista
    let lista = nuevaClasificacionListaB;
    let index = -1;
    let tam = lista.length;

    for (let i = 0; i < tam; i++) {
      if (lista[i][0] === nuevaClasificacionLabelB) {
        index = i;
        break;
      }
    }

    if (index === -1) {
      alert("Se registro el valor de: " + nuevaClasificacionLabelB);
      lista.push([nuevaClasificacionLabelB, nuevaClasificacionValueB]);
    } else {
      alert("Se actualizo el valor de: " + nuevaClasificacionLabelB);
      lista[index] = [nuevaClasificacionLabelB, nuevaClasificacionValueB];
    }

    setNuevaClasificacionListaB(lista);
  }

  function getNuevaClasificacionB() {
    // Ingresamos los datos
    const formdata = new FormData();
    formdata.append("algoritmo", "bosque");
    formdata.append("lista", nuevaClasificacionListaB);

    var requestOptions = {
      method: "POST",
      body: formdata,
    };

    fetch(
      "http://127.0.0.1:8000/Clasificacion/nuevaClasificacion",
      requestOptions
    )
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        if (result !== false) {
          setNuevaClasificacionB(result);
          setVisibleNuevaClasificacionB(true);
        }
      })
      .catch((error) => console.log("error", error));
  }

  return (
    <Grid
      container
      sx={{
        backgroundColor: "whitesmoke",
      }}
    >
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        sx={{
          minHeight: "100vh",
        }}
      >
        <Box sx={{ padding: 2 }}>
          <Box sx={{ p: 2, border: "5px dashed purple" }}>
            <Titulo textAlign={"center"}>
              Clustering Particional y Clasificación
            </Titulo>

            <Subtitulo>Propósito</Subtitulo>

            <Parrafo>
              Segmentar datos y hacer una clasificación múltiple en función de
              los parámetros disponibles.
            </Parrafo>
          </Box>
        </Box>

        {/*Previsualización de datos*/}
        <Box sx={{ padding: 2 }}>
          <Box sx={{ p: 2, border: "5px dashed plum" }}>
            <Subtitulo>Previsualización de datos</Subtitulo>
            <CodigoBoton ejecutar={vistaPrevia} codigo={""} visible={false} />
          </Box>
        </Box>

        <Tabla
          dataColumnas={dataVistaPrevia[0]}
          dataFilas={dataVistaPrevia[1]}
          visible={visibleVistaPrevia}
        />

        {/*Descripción de la estructura de los datos*/}
        <Box sx={{ padding: 2 }}>
          <Box sx={{ p: 2, border: "5px dashed purple" }}>
            <Subtitulo>Descripción de la estructura de los datos</Subtitulo>
          </Box>
        </Box>

        <Box sx={{ padding: 2 }}>
          <Box sx={{ p: 2, border: "5px dashed plum" }}>
            <Parrafo>Suma de todos los valores nulos en cada variable.</Parrafo>

            <CodigoBoton ejecutar={getdatosFaltantesNull} visible={false} />
          </Box>
        </Box>

        <Tabla
          dataColumnas={datosFaltantesNull[0]}
          dataFilas={datosFaltantesNull[1]}
          visible={visibleFaltantesNull}
        />

        <Box sx={{ padding: 2 }}>
          <Box sx={{ p: 2, border: "5px dashed plum" }}>
            <Parrafo>Resumen estadístico de variables numéricas</Parrafo>
            <CodigoBoton ejecutar={getDataDescribe} visible={false} />
          </Box>
        </Box>

        <Tabla
          dataColumnas={dataDescribe[0]}
          dataFilas={dataDescribe[1]}
          visible={visibleDescribe}
        />

        <Box sx={{ padding: 2 }}>
          <Box sx={{ p: 2, border: "5px dashed plum" }}>
            <Parrafo>Distribución de variables categóricas</Parrafo>
            <CodigoBoton ejecutar={getDataDescribeObject} visible={false} />
          </Box>
        </Box>

        <Tabla
          dataColumnas={dataDescribeObject[0]}
          dataFilas={dataDescribeObject[1]}
          visible={visibleDescribeObject}
        />

        <Box sx={{ padding: 2 }}>
          <Box sx={{ p: 2, border: "5px dashed plum" }}>
            <Parrafo>Tamaño de una variable.</Parrafo>
            <Box sx={{ padding: 2 }}>
              <Selector
                label={"Variables"}
                lista={variables}
                elemento={variableSize}
                setElemento={setVariableSize}
              />
            </Box>
            <CodigoBoton ejecutar={getSize} visible={false} />
          </Box>
        </Box>

        <Tabla
          dataColumnas={tablaSize[0]}
          dataFilas={tablaSize[1]}
          visible={visibleTablaSize}
        />

        {/*Selección de caractersticas*/}
        <Box sx={{ padding: 2 }}>
          <Box sx={{ p: 2, border: "5px dashed purple" }}>
            <Subtitulo>Selección de características.</Subtitulo>
          </Box>
        </Box>

        <Box sx={{ padding: 2 }}>
          <Box sx={{ p: 2, border: "5px dashed plum" }}>
            <Parrafo>Matriz de correlaciones.</Parrafo>

            <CodigoBoton ejecutar={getDataCorrelacion} visible={false} />
          </Box>
        </Box>

        <Tabla
          dataColumnas={dataCorrelacion[0]}
          dataFilas={dataCorrelacion[1]}
          visible={visibleDataCorrelacion}
        />

        <Grid item xs={12} sm={12} md={12}>
          <Box sx={{ padding: 2 }}>
            <Box sx={{ p: 2, border: "5px dashed plum" }}>
              <Parrafo>Mapa de calor de correlaciones.</Parrafo>
              <CodigoBoton ejecutar={getDataCorrelacionMapa} visible={false} />
            </Box>
          </Box>
        </Grid>

        <HeatMap
          data={dataCorrelacionMapa}
          visible={visibleDataCorrelacionMapa}
        />

        {/*Limpieza de datos*/}
        <Box sx={{ padding: 2 }}>
          <Box sx={{ p: 2, border: "5px dashed purple" }}>
            <Subtitulo>Limpieza de datos.</Subtitulo>
          </Box>
        </Box>

        <Box sx={{ padding: 2 }}>
          <Box sx={{ p: 2, border: "5px dashed plum" }}>
            <Bold>
              Selecciona la(s) variable(s) que quieras eliminar y pulsa
              ejecutar.
            </Bold>
            <Parrafo>
              Las variables que aparecen son unicamente numericas con ellas se
              trabajara en los pasos siguientes. Si no deseas eliminar ninguna
              solo pulsa ejecutar.
            </Parrafo>

            <Box sx={{ padding: 2 }}>
              <Visualizador
                lista={variables}
                listaSeleccionada={variablesDrop}
                actualizaSeleccion={setVariablesDrop}
              />
            </Box>

            <CodigoBoton ejecutar={getDataDrop} visible={false} />
          </Box>
        </Box>

        <Tabla
          dataColumnas={tablaDrop[0]}
          dataFilas={tablaDrop[1]}
          visible={visibleTablaDrop}
        />

        {/*Modelo 1: Segmentación particiona*/}
        <Box sx={{ padding: 2 }}>
          <Box sx={{ p: 2, border: "5px dashed purple" }}>
            <Subtitulo>Modelo 1: Segmentación particiona</Subtitulo>
          </Box>
        </Box>

        <Box sx={{ padding: 2 }}>
          <Box sx={{ p: 2, border: "5px dashed plum" }}>
            <Bold>Algoritmo: K-means</Bold>
            <Parrafo>
              Los clústeres mediante K-means es un aprendizaje no supervisado
              popular. Se utiliza para encontrar grupos intrínsecos dentro del
              conjunto de datos sin etiquetar y extraer inferencias de ellos.
            </Parrafo>
            <CodigoBoton ejecutar={estandarizacion} visible={false} />
          </Box>
        </Box>

        <Tabla
          dataColumnas={tablaMetodo[0]}
          dataFilas={tablaMetodo[1]}
          visible={visibleTablaMetodo}
        />

        <Box sx={{ padding: 2 }}>
          <Box sx={{ p: 2, border: "5px dashed plum" }}>
            <Bold>Matriz de Clasificación</Bold>
            <CodigoBoton ejecutar={clasificacionMatriz} visible={false} />
          </Box>
        </Box>
        <Tabla
          dataColumnas={matriz[0]}
          dataFilas={matriz[1]}
          visible={visibleMatriz}
        />

        <Box sx={{ padding: 2 }}>
          <Box sx={{ p: 2, border: "5px dashed plum" }}>
            <Bold>Importancia de las variables.</Bold>
            <CodigoBoton ejecutar={getImportancia} visible={false} />
          </Box>
        </Box>
        <Tabla
          dataColumnas={tablaImportancia[0]}
          dataFilas={tablaImportancia[1]}
          visible={visibleTablaImportancia}
        />

        <Box sx={{ padding: 2 }}>
          <Box sx={{ p: 2, border: "5px dashed plum" }}>
            <Bold>Nuevas clasificaciones</Bold>
            <Parrafo>
              Para las variables de X previamente seleccionadas digite un valor
              y pulse ejecutar para cada una de las variables.
            </Parrafo>
            <Box sx={{ padding: 2 }}>
              <Selector
                label={"Variable"}
                lista={variablesNuevaClasificacion}
                elemento={nuevaClasificacionLabel}
                setElemento={setNuevaClasificacionLabel}
              />
              <Box sx={{ padding: 2 }}>
                <Comando
                  Label={nuevaClasificacionLabel}
                  setComando={setNuevaClasificacionValue}
                  comando={nuevaClasificacionValue}
                  type={"text"}
                />
              </Box>
            </Box>
            <CodigoBoton ejecutar={guardaValorClasificacion} visible={false} />
          </Box>
        </Box>
        <Box sx={{ padding: 2 }}>
          <Box sx={{ p: 2, border: "5px dashed plum" }}>
            <Bold>
              Pulse este botón una vez que haya terminado de asignar valores a
              las variables para realizar la clasificación.
            </Bold>
            <CodigoBoton
              ejecutar={getNuevaClasificacion}
              visible={visibleNuevaClasificacion}
              texto={nuevaClasificacion}
            />
          </Box>
        </Box>

        {/*Clasificación bosques*/}
        <Box sx={{ padding: 2 }}>
          <Box sx={{ p: 2, border: "5px dashed purple" }}>
            <Subtitulo>Aplicación del algoritmo: Bosques aleatorios</Subtitulo>
          </Box>
        </Box>

        <Box sx={{ padding: 2 }}>
          <Box sx={{ p: 2, border: "5px dashed plum" }}>
            <Bold>Selecciona las variables predictoras (X).</Bold>
            <Box sx={{ padding: 2 }}>
              <Visualizador
                lista={variables}
                listaSeleccionada={variablesXB}
                actualizaSeleccion={setVariablesXB}
              />
            </Box>
            <CodigoBoton ejecutar={seleccionaXB} visible={false} />
          </Box>
        </Box>

        <Tabla
          dataColumnas={tablaXB[0]}
          dataFilas={tablaXB[1]}
          visible={visibleTablaXB}
        />

        <Box sx={{ padding: 2 }}>
          <Box sx={{ p: 2, border: "5px dashed plum" }}>
            <Bold>Selecciona la variable clase (Y).</Bold>
            <Parrafo>
              Si selecciona más de un elemento unicamente se tomara el primero
              en ser seleccionado.
            </Parrafo>
            <Box sx={{ padding: 2 }}>
              <Visualizador
                lista={variables}
                listaSeleccionada={variableYB}
                actualizaSeleccion={setVariableYB}
              />
            </Box>

            <CodigoBoton ejecutar={seleccionaYB} visible={false} />
          </Box>
        </Box>

        <Tabla
          dataColumnas={tablaYB[0]}
          dataFilas={tablaYB[1]}
          visible={visibleTablaYB}
        />

        <Box sx={{ padding: 2 }}>
          <Box sx={{ p: 2, border: "5px dashed plum" }}>
            <Bold>Entrenamiento de modelo.</Bold>
            <Box sx={{ padding: 2 }}>
              <Comando
                Label={"n_estimatorsn"}
                setComando={setN_estimatorsB}
                comando={n_estimatorsB}
                type={"number"}
              />
              <Comando
                Label={"max_depth"}
                setComando={setMax_depthB}
                comando={max_depthB}
                type={"number"}
              />
              <Comando
                Label={"min_samples_split"}
                setComando={setMin_samples_splitB}
                comando={min_samples_splitB}
                type={"number"}
              />
              <Comando
                Label={"min_samples_leaf"}
                setComando={setMin_samples_leafB}
                comando={min_samples_leafB}
                type={"number"}
              />
              <Comando
                Label={"random_state"}
                setComando={setRandom_stateB}
                comando={random_stateB}
                type={"number"}
              />
            </Box>
            <CodigoBoton
              ejecutar={clasificacionEntrenamientoB}
              visible={visibleClasificacionMedidasB}
              texto={
                "Criterio: " +
                clasificacionMedidasB[0] +
                "\nExactitud: " +
                clasificacionMedidasB[1]
              }
            />
          </Box>
        </Box>

        <Box sx={{ padding: 2 }}>
          <Box sx={{ p: 2, border: "5px dashed plum" }}>
            <Bold>Matriz de Clasificación</Bold>
            <CodigoBoton ejecutar={clasificacionMatrizB} visible={false} />
          </Box>
        </Box>
        <Tabla
          dataColumnas={matrizB[0]}
          dataFilas={matrizB[1]}
          visible={visibleMatrizB}
        />

        <Box sx={{ padding: 2 }}>
          <Box sx={{ p: 2, border: "5px dashed plum" }}>
            <Bold>Importancia de las variables.</Bold>
            <CodigoBoton ejecutar={getImportanciaB} visible={false} />
          </Box>
        </Box>
        <Tabla
          dataColumnas={tablaImportanciaB[0]}
          dataFilas={tablaImportanciaB[1]}
          visible={visibleTablaImportanciaB}
        />

        <Box sx={{ padding: 2 }}>
          <Box sx={{ p: 2, border: "5px dashed plum" }}>
            <Bold>Nuevas clasificaciones.</Bold>
            <Parrafo>
              Para las variables de X previamente seleccionadas digite un valor
              y pulse ejecutar para cada una de las variables.
            </Parrafo>
            <Box sx={{ padding: 2 }}>
              <Selector
                label={"Variable"}
                lista={variablesNuevaClasificacionB}
                elemento={nuevaClasificacionLabelB}
                setElemento={setNuevaClasificacionLabelB}
              />
              <Box sx={{ padding: 2 }}>
                <Comando
                  Label={nuevaClasificacionLabelB}
                  setComando={setNuevaClasificacionValueB}
                  comando={nuevaClasificacionValueB}
                  type={"text"}
                />
              </Box>
            </Box>
            <CodigoBoton ejecutar={guardaValorClasificacionB} visible={false} />
          </Box>
        </Box>
        <Box sx={{ padding: 2 }}>
          <Box sx={{ p: 2, border: "5px dashed plum" }}>
            <Bold>
              Pulse este botón una vez que haya terminado de asignar valores a
              las variables para realizar la clasificación.
            </Bold>
            <CodigoBoton
              ejecutar={getNuevaClasificacionB}
              visible={visibleNuevaClasificacionB}
              texto={nuevaClasificacionB}
            />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}