//Bibliotecas
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { Typography, Grid, Box } from "@mui/material";

//Componentes
import Tabla from "../Componentes/EDA/Tabla";
import CodigoBoton from "../Componentes/EDA/CodigoBoton";

//Graficas
import Barra from "../Graficas/Barra";
import Caja from "../Graficas/Caja";


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

  // Vista Previa
  const [dataColumnas, setDataColumnas] = useState([]);
  const [dataFilas, setDataFilas] = useState([]);
  const [visibleVistaPrevia, setVisibleVistaPrevia] = useState(false);

  // Paso 1
  const [forma, setForma] = useState(["", ""]);
  const [visibleForma, setVisibleForma] = useState(false);

  const [tiposDatos, setTiposDatos] = useState([[], []]);
  const [visibleTiposDatos, setVisibleTiposDatos] = useState(false);

  // Paso 2
  const [datosFaltantesNull, setDatosFaltantesNull] = useState([[], []]);
  const [visibleFaltantesNull, setVisibleFaltantesNull] = useState(false);

  // Paso 3
  const [dataHistograma, setDataHistograma] = useState([]);
  const [dataDescribe, setDataDescribe] = useState([[], []]);
  const [visibleDescribe, setVisibleDescribe] = useState(false);
  const [dataBox, setDataBox] = useState([]);

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
        if (result !== [[], []]) {
          setVisibleVistaPrevia(true);
        }
      })
      .catch((error) => console.log("error", error));
  }

  function getForma() {
    var requestOptions = {
      method: "GET",
    };

    fetch("http://127.0.0.1:8000/EDA/Forma", requestOptions)
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

    fetch("http://127.0.0.1:8000/EDA/TiposDeDatos", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setTiposDatos([result[0], result[1]]);
        if (result !== [[], []]) {
          setVisibleTiposDatos(true);
        }
      })
      .catch((error) => console.log("error", error));
  }

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

  function getDataHistogramas() {
    var requestOptions = {
      method: "GET",
    };

    fetch("http://127.0.0.1:8000/EDA/DataHistogramas", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setDataHistograma(result);
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

  function getDataBox() {
    var requestOptions = {
      method: "GET",
    };

    fetch("http://127.0.0.1:8000/EDA/Box", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setDataBox(result);
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
          backgroundColor: "whitesmoke",
        }}
      >
        <Box sx={{ padding: 2 }}>
          <Box sx={{ p: 2, border: "5px dashed purple" }}>
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
          <Box sx={{ p: 2, border: "5px dashed plum" }}>
            <Subtitulo>Previsualización de datos</Subtitulo>
            <CodigoBoton ejecutar={vistaPrevia} codigo={""} visible={false} />
          </Box>
        </Box>

        <Tabla
          dataColumnas={dataColumnas}
          dataFilas={dataFilas}
          visible={visibleVistaPrevia}
        />

        {/*Paso 1*/}
        <Box sx={{ padding: 2 }}>
          <Box sx={{ p: 2, border: "5px dashed purple" }}>
            <Subtitulo>
              Paso 1: Descripción de la estructura de los datos.
            </Subtitulo>
          </Box>
        </Box>
        <Box sx={{ padding: 2 }}>
          <Box sx={{ p: 2, border: "5px dashed plum" }}>
            <Parrafo>a) Forma (dimensiones) del DataFrame.</Parrafo>

            <CodigoBoton
              ejecutar={getForma}
              codigo={"(" + forma[0] + "," + forma[1] + ")"}
              visible={visibleForma}
            />
          </Box>
        </Box>
        <Box sx={{ padding: 2 }}>
          <Box sx={{ p: 2, border: "5px dashed plum" }}>
            <Parrafo>b) Tipos de datos (variables).</Parrafo>
            <CodigoBoton ejecutar={getTiposDeDatos} visible={false} />
          </Box>
        </Box>

        <Tabla
          dataColumnas={tiposDatos[0]}
          dataFilas={tiposDatos[1]}
          visible={visibleTiposDatos}
        />

        {/*Paso 2*/}
        <Box sx={{ padding: 2 }}>
          <Box sx={{ p: 2, border: "5px dashed purple" }}>
            <Subtitulo>Paso 2: Identificación de datos faltantes.</Subtitulo>
          </Box>
        </Box>
        <Box sx={{ padding: 2 }}>
          <Box sx={{ p: 2, border: "5px dashed plum" }}>
            <Parrafo>
              Una función útil de pandas es .isnull().sum() que regresa la suma
              de todos los valores nulos en cada variable.
            </Parrafo>

            <CodigoBoton ejecutar={getdatosFaltantesNull} visible={false} />
          </Box>
        </Box>

        <Tabla
          dataColumnas={datosFaltantesNull[0]}
          dataFilas={datosFaltantesNull[1]}
          visible={visibleFaltantesNull}
        />

        {/*Paso 3*/}
        <Box sx={{ padding: 2 }}>
          <Box sx={{ p: 2, border: "5px dashed purple" }}>
            <Subtitulo>Paso 3: Detección de valores atípicos.</Subtitulo>
          </Box>
        </Box>
        <Box sx={{ padding: 2 }}>
          <Box sx={{ p: 2, border: "5px dashed plum" }}>
            <Parrafo>a) Distribución de variables numéricas</Parrafo>
            <CodigoBoton ejecutar={getDataHistogramas} visible={false} />
          </Box>
        </Box>
      </Grid>

      {dataHistograma.map((d, index) => (
        <Grid item xs={12} sm={6} md={4}>
          <Box sx={{ padding: 2 }}>
            <Box sx={{ p: 2, border: "5px dashed plum" }}>
              <Barra
                keys={["value"]}
                data={d.data}
                indexBy={"id"}
                title={d.title}
              />
            </Box>
          </Box>
        </Grid>
      ))}

      <Grid item xs={12} sm={12} md={12}>
        <Box sx={{ padding: 2 }}>
          <Box sx={{ p: 2, border: "5px dashed plum" }}>
            <Parrafo>b) Resumen estadístico de variables numéricas</Parrafo>

            <CodigoBoton ejecutar={getDataDescribe} visible={false} />
          </Box>
        </Box>
      </Grid>

      <Tabla
        dataColumnas={dataDescribe[0]}
        dataFilas={dataDescribe[1]}
        visible={visibleDescribe}
      />

      <Grid item xs={12} sm={12} md={12}>
        <Box sx={{ padding: 2 }}>
          <Box sx={{ p: 2, border: "5px dashed plum" }}>
            <Parrafo>
              c) Diagramas para detectar posibles valores atípicos
            </Parrafo>

            <CodigoBoton ejecutar={getDataBox} visible={false} />
          </Box>
        </Box>
      </Grid>

      {dataBox.map((d, index) => (
        <Grid item xs={12} sm={6} md={4}>
          <Box sx={{ padding: 2 }}>
            <Box sx={{ p: 2, border: "5px dashed plum" }}>
              <Caja
                data={[
                  {
                    type: "box",
                    x: d.value,
                    name: "",
                    marker: {
                      color: "rgb(163,73,164)",
                    },
                    boxpoints: "Outliers",
                  },
                ]}
                layout={{
                  width: 380,
                  height: 380,
                  title: d.nombre,
                  margin: {
                    t: 40,
                    b: 40,
                    l: 0,
                    r: 0,
                  },
                }}
              />
            </Box>
          </Box>
        </Grid>
      ))}

      <Grid item xs={12} sm={12} md={12}>
        <Box sx={{ padding: 2 }}>
          <Box sx={{ p: 2, border: "5px dashed purple" }}>
            <Subtitulo>
              Paso 4: Identificación de relaciones entre pares variables.
            </Subtitulo>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
