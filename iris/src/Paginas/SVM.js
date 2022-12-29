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

// Alertas
import Swal from "sweetalert2";

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

export default function SVM() {
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
  const [dataCorrelacionMapa, setDataCorrelacionMapa] = useState([]);
  const [visibleDataCorrelacionMapa, setVisibleDataCorrelacionMapa] =
    useState(false);

  // Limpieza de datos
  const [variables, setVariables] = useState([]);

  // Clasificación Árboles
  const [variablesX, setVariablesX] = useState([]);
  const [tablaX, setTablaX] = useState([]);
  const [visibleTablaX, setVisibleTablaX] = useState(false);
  const [variableY, setVariableY] = useState([]);
  const [tablaY, setTablaY] = useState([]);
  const [visibleTablaY, setVisibleTablaY] = useState(false);

  // Configuración de entrenamiento
  const [kernel, setKernel] = useState("");
  const [test_size, setTest_size] = useState("0.2");
  const [random_state, setRandom_state] = useState("0");
  const [degree, setDegree] = useState("0");
  const [medidas, setMedidas] = useState([]);
  const [visibleMedidas, setVisibleMedidas] = useState(false);

  // Matriz de clasificación árboles
  const [matriz, setMatriz] = useState([[], []]);
  const [visibleMatriz, setVisibleMatriz] = useState(false);

  // Tabla de vectores
  const [tablaVectores, setTablaVectores] = useState([[], []]);
  const [visibleTablaVectores, setVisibleTablaVectores] = useState(false);

  // Variables de Clasificación
  const [variablesNuevaClasificacion] = useState(variablesX);
  const [nuevaClasificacionLabel, setNuevaClasificacionLabel] = useState("");
  const [nuevaClasificacionValue, setNuevaClasificacionValue] = useState("");
  const [nuevaClasificacionLista, setNuevaClasificacionLista] = useState([]);
  const [visibleNuevaClasificacionLista, setVisibleNuevaClasificacionLista] =
    useState(false);
  const [nuevaClasificacion, setNuevaClasificacion] = useState([]);
  const [visibleNuevaClasificacion, setVisibleNuevaClasificacion] =
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
          Swal.fire({
            title: "Error",
            text: "Carga un proyecto",
            icon: "error",
            confirmButtonText: "Aceptar",
          });
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
          Swal.fire({
            title: "Error",
            text: "Carga un proyecto",
            icon: "error",
            confirmButtonText: "Aceptar",
          });
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
          Swal.fire({
            title: "Error",
            text: "Carga un proyecto",
            icon: "error",
            confirmButtonText: "Aceptar",
          });
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
          Swal.fire({
            title: "Error",
            text: "Carga un proyecto",
            icon: "error",
            confirmButtonText: "Aceptar",
          });
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
      Swal.fire({
        title: "Advertencia",
        text: "Selecciona una variable",
        icon: "warning",
        confirmButtonText: "Aceptar",
      });
    }
  }

  // Selección de características
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
          Swal.fire({
            title: "Error",
            text: "Carga un proyecto",
            icon: "error",
            confirmButtonText: "Aceptar",
          });
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

  // SVM

  function seleccionSVM(letra) {
    // Ingresamos los datos
    const formdata = new FormData();
    if (letra === "x") {
      formdata.append("lista", variablesX);
    } else {
      formdata.append("lista", variableY);
    }

    formdata.append("seleccion", letra);

    var requestOptions = {
      method: "POST",
      body: formdata,
    };

    fetch(
      "http://127.0.0.1:8000/Clasificacion/Arboles/seleccion",
      requestOptions
    )
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        if (result !== false) {
          if (letra === "x") {
            setTablaX([result[0], result[1]]);
            setVisibleTablaX(true);
          } else {
            setTablaY([result[0], result[1]]);
            setVisibleTablaY(true);
          }
        } else {
          Swal.fire({
            title: "Advertencia",
            text: "Selecciona alguna variable",
            icon: "warning",
            confirmButtonText: "Aceptar",
          });
        }
      })
      .catch((error) => console.log("error", error));
  }

  function seleccionaX() {
    seleccionSVM("x");
  }

  function seleccionaY() {
    seleccionSVM("y");
  }

  function entrenamiento() {
    if (kernel !== "") {
      // Ingresamos los datos
      const formdata = new FormData();
      formdata.append("kernel", kernel);
      formdata.append("test_size", test_size);
      formdata.append("random_state", random_state);
      formdata.append("degree", degree);

      var requestOptions = {
        method: "POST",
        body: formdata,
      };

      fetch("http://127.0.0.1:8000/SVM/Entrenamiento", requestOptions)
        .then((response) => {
          return response.json();
        })
        .then((result) => {
          if (result !== false) {
            setMedidas(result);
            setVisibleMedidas(true);
          } else {
            Swal.fire({
              title: "Error",
              text: "Favor de revisar si realizo todos los pasos anteriores",
              icon: "error",
              confirmButtonText: "Aceptar",
            });
          }
        })
        .catch((error) => console.log("error", error));
    } else {
      Swal.fire({
        title: "Advertencia",
        text: "Favor de escoger un kernel",
        icon: "warning",
        confirmButtonText: "Aceptar",
      });
    }
  }

  function getMatriz() {
    var requestOptions = {
      method: "GET",
    };

    fetch("http://127.0.0.1:8000/SVM/matriz", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        if (result !== false) {
          setMatriz(result);
          setVisibleMatriz(true);
        } else {
          Swal.fire({
            title: "Error",
            text: "Carga un proyecto",
            icon: "error",
            confirmButtonText: "Aceptar",
          });
        }
      })
      .catch((error) => console.log("error", error));
  }

  function getVectores() {
    var requestOptions = {
      method: "GET",
    };

    fetch("http://127.0.0.1:8000/SVM/vectoresSoporte", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        if (result !== false) {
          setTablaVectores(result);
          setVisibleTablaVectores(true);
        } else {
          Swal.fire({
            title: "Error",
            text: "Carga un proyecto",
            icon: "error",
            confirmButtonText: "Aceptar",
          });
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

    if (nuevaClasificacionLabel !== "") {
      if (index === -1) {
        Swal.fire({
          title: "Guardado",
          text: "Se registro el valor de " + nuevaClasificacionLabel,
          icon: "success",
          confirmButtonText: "Aceptar",
        });
        lista.push([nuevaClasificacionLabel, nuevaClasificacionValue]);
      } else {
        Swal.fire({
          title: "Actualizado",
          text: "Se actualizo el valor de: " + nuevaClasificacionLabel,
          icon: "success",
          confirmButtonText: "Aceptar",
        });
        lista[index] = [nuevaClasificacionLabel, nuevaClasificacionValue];
      }
      setVisibleNuevaClasificacionLista(false);
      setNuevaClasificacionLista(lista);
    } else {
      Swal.fire({
        title: "Advertencia",
        text: "Selecciona una variable",
        icon: "warning",
        confirmButtonText: "Aceptar",
      });
    }
  }

  function getNuevaClasificacion() {
    // Ingresamos los datos
    const formdata = new FormData();
    formdata.append("lista", nuevaClasificacionLista);

    var requestOptions = {
      method: "POST",
      body: formdata,
    };

    fetch("http://127.0.0.1:8000/SVM/nuevaClasificacion", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        if (result !== false) {
          setNuevaClasificacion(result);
          setVisibleNuevaClasificacion(true);
          setVisibleNuevaClasificacionLista(true);
        } else {
          Swal.fire({
            title: "Error",
            text: "Carga un proyecto",
            icon: "error",
            confirmButtonText: "Aceptar",
          });
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
            <Titulo textAlign={"center"}>Clasificación con SVM</Titulo>

            <Subtitulo>Propósito</Subtitulo>

            <Parrafo>
              Clasificar el conjunto de información a través de un algoritmo de
              aprendizaje automático.
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

        {/*Clasificación arboles*/}
        <Box sx={{ padding: 2 }}>
          <Box sx={{ p: 2, border: "5px dashed purple" }}>
            <Subtitulo>
              Aplicación del algoritmo: Máquina de soporte vactorial (SVM)
            </Subtitulo>
          </Box>
        </Box>

        <Box sx={{ padding: 2 }}>
          <Box sx={{ p: 2, border: "5px dashed plum" }}>
            <Bold>Selecciona las variables predictoras (X).</Bold>
            <Box sx={{ padding: 2 }}>
              <Visualizador
                lista={variables}
                listaSeleccionada={variablesX}
                actualizaSeleccion={setVariablesX}
              />
            </Box>
            <CodigoBoton ejecutar={seleccionaX} visible={false} />
          </Box>
        </Box>

        <Tabla
          dataColumnas={tablaX[0]}
          dataFilas={tablaX[1]}
          visible={visibleTablaX}
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
                listaSeleccionada={variableY}
                actualizaSeleccion={setVariableY}
              />
            </Box>

            <CodigoBoton ejecutar={seleccionaY} visible={false} />
          </Box>
        </Box>

        <Tabla
          dataColumnas={tablaY[0]}
          dataFilas={tablaY[1]}
          visible={visibleTablaY}
        />

        <Box sx={{ padding: 2 }}>
          <Box sx={{ p: 2, border: "5px dashed plum" }}>
            <Bold>Entrenamiento de modelo.</Bold>
            <Parrafo>
              Degree unicamente se utilizara con el kernel de "poly".
            </Parrafo>
            <Box sx={{ padding: 2 }}>
              <Selector
                label={"Kernel"}
                lista={["linear", "poly", "rbf", "sigmoid"]}
                elemento={kernel}
                setElemento={setKernel}
              />
            </Box>
            <Box sx={{ padding: 2 }}>
              <Comando
                Label={"test_size"}
                setComando={setTest_size}
                comando={test_size}
                type={"number"}
              />
              <Comando
                Label={"random_state"}
                setComando={setRandom_state}
                comando={random_state}
                type={"number"}
              />
              <Comando
                Label={"degree"}
                setComando={setDegree}
                comando={degree}
                type={"number"}
              />
            </Box>
            <CodigoBoton
              ejecutar={entrenamiento}
              visible={visibleMedidas}
              texto={
                "Exactitud: " +
                medidas[0] +
                "\nNúmero de vectores de soporte: [" +
                medidas[1] +
                "]"
              }
            />
          </Box>
        </Box>

        <Box sx={{ padding: 2 }}>
          <Box sx={{ p: 2, border: "5px dashed plum" }}>
            <Bold>Matriz de Clasificación</Bold>
            <CodigoBoton ejecutar={getMatriz} visible={false} />
          </Box>
        </Box>
        <Tabla
          dataColumnas={matriz[0]}
          dataFilas={matriz[1]}
          visible={visibleMatriz}
        />

        <Box sx={{ padding: 2 }}>
          <Box sx={{ p: 2, border: "5px dashed plum" }}>
            <Bold>Vectores de soporte</Bold>
            <CodigoBoton ejecutar={getVectores} visible={false} />
          </Box>
        </Box>
        <Tabla
          dataColumnas={tablaVectores[0]}
          dataFilas={tablaVectores[1]}
          visible={visibleTablaVectores}
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
            <Parrafo>
              La tabla inferior son los valores utilizados para esta
              clasificación.
            </Parrafo>
            <CodigoBoton
              ejecutar={getNuevaClasificacion}
              visible={visibleNuevaClasificacion}
              texto={nuevaClasificacion}
            />
          </Box>
        </Box>

        <Tabla
          dataColumnas={["Variable", "Valor"]}
          dataFilas={nuevaClasificacionLista}
          visible={visibleNuevaClasificacionLista}
        />
      </Grid>
    </Grid>
  );
}
