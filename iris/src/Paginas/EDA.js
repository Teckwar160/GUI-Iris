//Bibliotecas
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { Typography, Grid, Box } from "@mui/material";

//Componentes
import Tabla from "../Componentes/EDA/Tabla";
import CodigoBoton from "../Componentes/EDA/CodigoBoton";

//Graficas
import Barra from "../Graficas/Barra";

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

const Parrafo = styled(Typography)({
  textAlign: "justify",
});

export default function EDA() {
  // Comandos de EDA
  const [dataColumnas, setDataColumnas] = useState([]);
  const [dataFilas, setDataFilas] = useState([]);

  // Paso 1
  const [forma, setForma] = useState(["", ""]);
  const [visibleForma, setVisibleForma] = useState(false);

  const [tiposDatos, setTiposDatos] = useState([[], []]);

  // Paso 2
  const [datosFaltantesNull, setDatosFaltantesNull] = useState([[], []]);

  // Paso 3
  const [dataHistograma, setDataHistograma] = useState([]);

  //Funciones
  function vistaPrevia() {
    var requestOptions = {
      method: "GET",
    };

    fetch("http://127.0.0.1:8000/vistaPrevia", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setDataColumnas(result[0]);
        setDataFilas(result[1]);
      })
      .catch((error) => console.log("error", error));
  }

  function getForma() {
    var requestOptions = {
      method: "GET",
    };

    fetch("http://127.0.0.1:8000/Forma", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setForma([result[0], result[1]]);
        if (result !== false) {
          setVisibleForma(true);
        }
      })
      .catch((error) => console.log("error", error));
  }

  function getTiposDeDatos() {
    var requestOptions = {
      method: "GET",
    };

    fetch("http://127.0.0.1:8000/TiposDeDatos", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setTiposDatos([result[0], result[1]]);
      })
      .catch((error) => console.log("error", error));
  }

  function getdatosFaltantesNull() {
    var requestOptions = {
      method: "GET",
    };

    fetch("http://127.0.0.1:8000/DatosFaltantesNull", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setDatosFaltantesNull([result[0], result[1]]);
      })
      .catch((error) => console.log("error", error));
  }

  function getDataHistogramas() {
    var requestOptions = {
      method: "GET",
    };

    fetch("http://127.0.0.1:8000/DataHistogramas", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setDataHistograma(result);
      })
      .catch((error) => console.log("error", error));
  }

  return (
    <Grid container>
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        sx={{
          minHeight: "100vh",
          backgroundColor: "white",
        }}
      >
        <Box sx={{ padding: 2 }}>
          <Box sx={{ p: 2, border: "5px dashed silver" }}>
            <Titulo textAlign={"center"}>EDA</Titulo>

            <Subtitulo>Propósito</Subtitulo>

            <Parrafo>
              Tener una idea de la estructura del conjunto de datos, identicar
              la variable objetivo y posibles técnicas de modelado.
            </Parrafo>
          </Box>
        </Box>

        {/*Previsualización de datos*/}
        <Box sx={{ padding: 2 }}>
          <Box sx={{ p: 2, border: "5px dashed silver" }}>
            <Subtitulo>Previsualización de datos</Subtitulo>

            <Tabla dataColumnas={dataColumnas} dataFilas={dataFilas} />

            <CodigoBoton ejecutar={vistaPrevia} codigo={""} visible={false} />
          </Box>
        </Box>

        {/*Paso 1*/}
        <Box sx={{ padding: 2 }}>
          <Box sx={{ p: 2, border: "5px dashed silver" }}>
            <Subtitulo>
              Paso 1: Descripción de la estructura de los datos.
            </Subtitulo>

            <Parrafo>a) Forma (dimensiones) del DataFrame.</Parrafo>

            <CodigoBoton
              ejecutar={getForma}
              codigo={"(" + forma[0] + "," + forma[1] + ")"}
              visible={visibleForma}
            />

            <Parrafo>b) Tipos de datos (variables).</Parrafo>

            <Tabla dataColumnas={tiposDatos[0]} dataFilas={tiposDatos[1]} />

            <CodigoBoton ejecutar={getTiposDeDatos} visible={false} />
          </Box>
        </Box>

        {/*Paso 2*/}
        <Box sx={{ padding: 2 }}>
          <Box sx={{ p: 2, border: "5px dashed silver" }}>
            <Subtitulo>Paso 2: Identificación de datos faltantes.</Subtitulo>
            <Parrafo>
              Una función útil de pandas es .isnull().sum() que regresa la suma
              de todos los valores nulos en cada variable.
            </Parrafo>

            <Tabla
              dataColumnas={datosFaltantesNull[0]}
              dataFilas={datosFaltantesNull[1]}
            />

            <CodigoBoton ejecutar={getdatosFaltantesNull} visible={false} />
          </Box>
        </Box>
      </Grid>
      {/*Paso 3*/}
      <Box sx={{ padding: 2 }}>
        <Box sx={{ p: 2, border: "5px dashed silver" }}>
          <Subtitulo>Paso 3: Detección de valores atípicos.</Subtitulo>
          <Parrafo>
            Se pueden utilizar gráficos para tener una idea general de las
            distribuciones de los datos, y se sacan estadísticas para resumir
            los datos. Estas dos estrategias son recomendables y se
            complementan. La distribución se refiere a cómo se distribuyen los
            valores en una variable o con qué frecuencia ocurren. Para las
            variables numéricas, se observa cuántas veces aparecen grupos de
            números en una columna. Mientras que para las variables categóricas,
            son las clases de cada columna y su frecuencia.
          </Parrafo>
          <CodigoBoton ejecutar={getDataHistogramas} visible={false} />
        </Box>
      </Box>

      {dataHistograma.map((d, index) => (
        <Grid item xs={12} sm={6} md={4}>
          <Box sx={{ padding: 2 }}>
            <Box sx={{ p: 2, border: "5px dashed silver" }}>
              <Barra
                keys={["id"]}
                data={d.data}
                indexBy={"value"}
                title={d.title}
              />
            </Box>
          </Box>
        </Grid>
      ))}

      <Grid item xs={12} sm={12} md={12}>
        <Box sx={{ padding: 2 }}>
          <Box sx={{ p: 2, border: "5px dashed silver" }}>
            <Subtitulo>
              Paso 4: Identificación de relaciones entre pares variables.
            </Subtitulo>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
