//Bibliotecas
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { Typography, Grid, Box } from "@mui/material";

//Componentes
import Tabla from "../Componentes/Mostrar datos/Tabla";
import CodigoBoton from "../Componentes/Mostrar datos/CodigoBoton";

//Graficas
import HeatMap from "../Graficas/HeatMap";

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

export default function EDA() {
  // Comandos de EDA

  // Vista Previa
  const [dataVistaPrevia, setDataVistaPrevia] = useState([[], []]);
  const [visibleVistaPrevia, setVisibleVistaPrevia] = useState(false);

  // Paso 1
  const [dataCorrelacion, setDataCorrelacion] = useState([[], []]);
  const [visibleDataCorrelacion, setVisibleDataCorrelacion] = useState(false);
  const [dataCorrelacionMapa, setDataCorrelacionMapa] = useState([]);
  const [visibleDataCorrelacionMapa, setVisibleDataCorrelacionMapa] =
    useState(false);

  // Paso 2
  const [dataStandardScaler, setDataStandardScaler] = useState([[], []]);
  const [visibleDataStandardScaler, setVisibleDataStandardScaler] =
    useState(false);

  const [dataMinMaxScaler, setDataMinMaxScaler] = useState([[], []]);
  const [visibleDataMinMaxScaler, setVisibleDataMinMaxScaler] =
    useState(false);

  // Paso 3

  // Paso 4

  // Vista previa
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

  // Paso 1
  function getDataCorrelacion() {
    var requestOptions = {
      method: "GET",
    };

    fetch("http://127.0.0.1:8000/PCA/DataCorrelacion", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setDataCorrelacion(result);
        if (result !== [[], []]) {
          setVisibleDataCorrelacion(true);
        }
      })
      .catch((error) => console.log("error", error));
  }

  function getDataCorrelacionMapa() {
    var requestOptions = {
      method: "GET",
    };

    fetch("http://127.0.0.1:8000/PCA/DataCorrelacion/Mapa", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setDataCorrelacionMapa(result);
        if (result !== []) {
          setVisibleDataCorrelacionMapa(true);
        }
      })
      .catch((error) => console.log("error", error));
  }

  // Paso 2
  function standardScaler() {
    var requestOptions = {
      method: "GET",
    };

    fetch("http://127.0.0.1:8000/PCA/Estandar/StandardScaler", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setDataStandardScaler([result[0], result[1]]);
        if (result !== [[], []]) {
          setVisibleDataStandardScaler(true);
        }
      })
      .catch((error) => console.log("error", error));
  }

  function MinMaxScaler() {
    var requestOptions = {
      method: "GET",
    };

    fetch("http://127.0.0.1:8000/PCA/Estandar/MinMaxScaler", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setDataMinMaxScaler([result[0], result[1]]);
        if (result !== [[], []]) {
          setVisibleDataMinMaxScaler(true);
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
            <Titulo textAlign={"center"}>PCA</Titulo>

            <Subtitulo>Propósito</Subtitulo>

            <Parrafo>
              Intentar encontrar una estructura donde la varianza de los datos
              sea mayor, es decir, donde hay una mayor dispersión de éstos.
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

        {/*Paso  1*/}
        <Box sx={{ padding: 2 }}>
          <Box sx={{ p: 2, border: "5px dashed purple" }}>
            <Subtitulo>
              Paso 1: Hay evidencia de variables posiblemente correlacionadas.
            </Subtitulo>
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

      {/*Paso 2*/}
      <Grid item xs={12} sm={12} md={12}>
        <Box sx={{ padding: 2 }}>
          <Box sx={{ p: 2, border: "5px dashed purple" }}>
            <Subtitulo>
              Paso 2: Se hace una estandarización de los datos.
            </Subtitulo>
          </Box>
        </Box>

        <Box sx={{ padding: 2 }}>
          <Box sx={{ p: 2, border: "5px dashed plum" }}>
            <Parrafo>Estandarización con StandardScaler.</Parrafo>
            <CodigoBoton ejecutar={standardScaler} visible={false} />
          </Box>
        </Box>

        <Tabla
          dataColumnas={dataStandardScaler[0]}
          dataFilas={dataStandardScaler[1]}
          visible={visibleDataStandardScaler}
        />

        <Box sx={{ padding: 2 }}>
          <Box sx={{ p: 2, border: "5px dashed plum" }}>
            <Parrafo>Estandarización con MinMaxScaler.</Parrafo>
            <CodigoBoton ejecutar={MinMaxScaler} visible={false} />
          </Box>
        </Box>

        <Tabla
          dataColumnas={dataMinMaxScaler[0]}
          dataFilas={dataMinMaxScaler[1]}
          visible={visibleDataMinMaxScaler}
        />
      </Grid>
    </Grid>
  );
}
