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

export default function PronosticoArboles() {
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
  const [dataDrop, setDataDrop] = useState([]);
  const [variables, setVariables] = useState([]);
  const [visibleDataDrop, setVisibleDataDrop] = useState(false);
  const [variable, setVariable] = useState("");

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

    fetch("http://127.0.0.1:8000/PCA/trae/Variables", requestOptions)
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
    formdata.append("variable", variable);

    var requestOptions = {
      method: "POST",
      body: formdata,
    };

    fetch("http://127.0.0.1:8000/PCA/Drop", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        alert("Se elimino correctamente la variable");
        setDataDrop([result[0], result[1]]);
        traeVariables();
        if (result !== [[], []]) {
          setVisibleDataDrop(true);
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
            <Parrafo>
              Selecciona la variable que quieras eliminar y pulsa ejecutar.
            </Parrafo>
            <Box sx={{ padding: 2 }}>
              <Visualizador variables={variables} funcion={setVariable} />
            </Box>

            <CodigoBoton ejecutar={getDataDrop} visible={false} />
          </Box>
        </Box>

        <Tabla
          dataColumnas={dataDrop[0]}
          dataFilas={dataDrop[1]}
          visible={visibleDataDrop}
        />
      </Grid>
    </Grid>
  );
}
