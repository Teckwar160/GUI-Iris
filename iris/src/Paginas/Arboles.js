//Bibliotecas
import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Typography, Grid, Box } from "@mui/material";

//Componentes
import Tabla from "../Componentes/Mostrar datos/Tabla";
import CodigoBoton from "../Componentes/Mostrar datos/CodigoBoton";
import Visualizador from "../Componentes/Editores/Visualizador";

//Estilos
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

export default function Arboles() {
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

  // Limpieza de datos
  const [variables, setVariables] = useState([]);
  const [tablaDrop, setTablaDrop] = useState([]);
  const [visibleTablaDrop, setVisibleTablaDrop] = useState(false);
  const [variablesDrop, setVariablesDrop] = useState([]);

  // Pronostico
  const [variablesSeleccion, setVariablesSeleccion] = useState([]);
  const [variablesX, setVariablesX] = useState([]);
  const [tablaX, setTablaX] = useState([]);
  const [visibleTablaX, setVisibleTablaX] = useState(false);
  const [variableY, setVariableY] = useState([]);
  const [tablaY, setTablaY] = useState([]);
  const [visibleTablaY, setVisibleTablaY] = useState(false);

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
        setDataVistaPrevia([result[0], result[1]]);
        if (result !== [[], []]) {
          setVisibleVistaPrevia(true);
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
        setDatosFaltantesNull([result[0], result[1]]);
        if (result !== [[], []]) {
          setVisibleFaltantesNull(true);
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
        setDataDescribe(result);
        if (result !== [[], []]) {
          setVisibleDescribe(true);
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
        setDataDescribeObject(result);
        if (result !== [[], []]) {
          setVisibleDescribeObject(true);
        }
      })
      .catch((error) => console.log("error", error));
  }

  // Limpieza de datos
  function traeVariables() {
    var requestOptions = {
      method: "GET",
    };

    fetch("http://127.0.0.1:8000/Arboles/trae/Variables", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setVariables(result);
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

    fetch("http://127.0.0.1:8000/Arboles/Drop", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        alert("Se elimino correctamente la(s) variable(s)");
        setTablaDrop([result[0], result[1]]);
        if (result !== [[], []]) {
          setVisibleTablaDrop(true);

          // Actualizamos las variables disponibles para despues
          traeVariablesSeleccion();
        }
      })
      .catch((error) => console.log("error", error));
  }

  // Pronostico
  function traeVariablesSeleccion() {
    var requestOptions = {
      method: "GET",
    };

    fetch(
      "http://127.0.0.1:8000/Arboles/trae/Variables/Seleccion",
      requestOptions
    )
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setVariablesSeleccion(result);
      })
      .catch((error) => console.log("error", error));
  }

  function defineX() {
    // Ingresamos los datos
    const formdata = new FormData();
    formdata.append("lista", variablesX);

    var requestOptions = {
      method: "POST",
      body: formdata,
    };

    fetch("http://127.0.0.1:8000/Arboles/seleccionaX", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        if (result !== false) {
          alert("Se asignarón correctamente las variables a X.");
          setTablaX([result[0], result[1]]);
          if (result !== [[], []]) {
            setVisibleTablaX(true);
          }
        } else {
          alert("Selecciona alguna variable.");
        }
      })
      .catch((error) => console.log("error", error));
  }

  function defineY() {
    // Ingresamos los datos
    const formdata = new FormData();
    formdata.append("lista", variableY);

    var requestOptions = {
      method: "POST",
      body: formdata,
    };

    fetch("http://127.0.0.1:8000/Arboles/seleccionaY", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        if (result !== false) {
          alert("Se asignó correctamente la variable a Y.");
          setTablaY([result[0], result[1]]);
          if (result !== [[], []]) {
            setVisibleTablaY(true);
          }
        } else {
          alert("Selecciona alguna variable.");
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
            <Titulo textAlign={"center"}>Pronóstico Arboles</Titulo>

            <Subtitulo>Propósito</Subtitulo>

            <Parrafo>
              Realizar un pronóstico de una variable a través de un algoritmo de
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

        {/*Pronóstico*/}
        <Box sx={{ padding: 2 }}>
          <Box sx={{ p: 2, border: "5px dashed purple" }}>
            <Subtitulo>Aplicación del algoritmo: Pronóstico Árboles</Subtitulo>
          </Box>
        </Box>

        <Box sx={{ padding: 2 }}>
          <Box sx={{ p: 2, border: "5px dashed plum" }}>
            <Bold>Selecciona las variables predictoras (X).</Bold>
            <Box sx={{ padding: 2 }}>
              <Visualizador
                lista={variablesSeleccion}
                listaSeleccionada={variablesX}
                actualizaSeleccion={setVariablesX}
              />
            </Box>
            <CodigoBoton ejecutar={defineX} visible={false} />
          </Box>
        </Box>

        <Tabla
          dataColumnas={tablaX[0]}
          dataFilas={tablaX[1]}
          visible={visibleTablaX}
        />

        <Box sx={{ padding: 2 }}>
          <Box sx={{ p: 2, border: "5px dashed plum" }}>
            <Bold>Selecciona la variable a pronosticar (Y).</Bold>
            <Parrafo>
              Si selecciona más de un elemento unicamente se tomara el primero
              en ser seleccionado.
            </Parrafo>
            <Box sx={{ padding: 2 }}>
              <Visualizador
                lista={variablesSeleccion}
                listaSeleccionada={variableY}
                actualizaSeleccion={setVariableY}
              />
            </Box>

            <CodigoBoton ejecutar={defineY} visible={false} />
          </Box>
        </Box>

        <Tabla
          dataColumnas={tablaY[0]}
          dataFilas={tablaY[1]}
          visible={visibleTablaY}
        />
      </Grid>
    </Grid>
  );
}
