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
  const [dataDescribeObject, setDataDescribeObject] = useState([[], []]);
  const [visibleDescribeObject, setVisibleDescribeObject] = useState(false);
  const [dataHistogramaObject, setDataHistogramaObject] = useState([]);

  // Paso 4
  const [dataCorrelacion, setDataCorrelacion] = useState([[], []]);
  const [visibleDataCorrelacion, setVisibleDataCorrelacion] = useState(false);
  const [dataCorrelacionMapa, setDataCorrelacionMapa] = useState([]);
  const [visibleDataCorrelacionMapa, setVisibleDataCorrelacionMapa] =
    useState(false);

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
        setDataColumnas(result[0]);
        setDataFilas(result[1]);
        if (result !== [[], []]) {
          setVisibleVistaPrevia(true);
        }
      })
      .catch((error) => console.log("error", error));
  }

  // Paso 1
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

  // Paso 2
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

  // Paso 3
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

  function getDataHistogramasObject() {
    var requestOptions = {
      method: "GET",
    };

    fetch("http://127.0.0.1:8000/EDA/DataHistogramas/Object", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setDataHistogramaObject(result);
      })
      .catch((error) => console.log("error", error));
  }

  // Paso 4
  function getDataCorrelacion() {
    var requestOptions = {
      method: "GET",
    };

    fetch("http://127.0.0.1:8000/EDA/DataCorrelacion", requestOptions)
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

    fetch("http://127.0.0.1:8000/EDA/DataCorrelacion/Mapa", requestOptions)
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
            <Bold>a) Forma (dimensiones) del DataFrame.</Bold>

            <CodigoBoton
              ejecutar={getForma}
              codigo={"(" + forma[0] + "," + forma[1] + ")"}
              visible={visibleForma}
            />
          </Box>
        </Box>
        <Box sx={{ padding: 2 }}>
          <Box sx={{ p: 2, border: "5px dashed plum" }}>
            <Bold>b) Tipos de datos (variables).</Bold>
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
            <Parrafo>Suma de todos los valores nulos en cada variable.</Parrafo>

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
            <Bold>a) Distribución de variables numéricas</Bold>
            <Parrafo>
              Se utilizan histogramas que agrupan los números en rangos.
            </Parrafo>
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
                layout={"vertical"}
                interactivo={false}
              />
            </Box>
          </Box>
        </Grid>
      ))}

      <Grid item xs={12} sm={12} md={12}>
        <Box sx={{ padding: 2 }}>
          <Box sx={{ p: 2, border: "5px dashed plum" }}>
            <Bold>b) Resumen estadístico de variables numéricas</Bold>
            <Parrafo>
              Se saca un resumen estadístico de las variables numéricas.
            </Parrafo>

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
            <Bold>c) Diagramas para detectar posibles valores atípicos</Bold>
            <Parrafo>
              Diagramas de cajas para detectar valores atípicos.
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
          <Box sx={{ p: 2, border: "5px dashed plum" }}>
            <Bold>d) Distribución de variables categóricas</Bold>
            <Parrafo>
              Se refiere a la observación de las clases de cada columna
              (variable) y su frecuencia.
            </Parrafo>

            <CodigoBoton ejecutar={getDataDescribeObject} visible={false} />
          </Box>
        </Box>
      </Grid>

      <Tabla
        dataColumnas={dataDescribeObject[0]}
        dataFilas={dataDescribeObject[1]}
        visible={visibleDescribeObject}
      />

      <Grid item xs={12} sm={12} md={12}>
        <Box sx={{ padding: 2 }}>
          <Box sx={{ p: 2, border: "5px dashed plum" }}>
            <Parrafo>Histograma para variables categóricas.</Parrafo>

            <CodigoBoton ejecutar={getDataHistogramasObject} visible={false} />
          </Box>
        </Box>
      </Grid>

      {dataHistogramaObject.map((d, index) => (
        <Grid item xs={12} sm={6} md={4}>
          <Box sx={{ padding: 2 }}>
            <Box sx={{ p: 2, border: "5px dashed plum" }}>
              <Barra
                keys={["value"]}
                data={d.data}
                indexBy={"id"}
                title={d.title}
                layout={"horizontal"}
                interactivo={true}
              />
            </Box>
          </Box>
        </Grid>
      ))}

      {/*Paso 4*/}
      <Grid item xs={12} sm={12} md={12}>
        <Box sx={{ padding: 2 }}>
          <Box sx={{ p: 2, border: "5px dashed purple" }}>
            <Subtitulo>
              Paso 4: Identificación de relaciones entre pares variables.
            </Subtitulo>
          </Box>
        </Box>

        <Box sx={{ padding: 2 }}>
          <Box sx={{ p: 2, border: "5px dashed plum" }}>
            <Parrafo>
              Una matriz de correlaciones es útil para analizar la relación
              entre las variables numéricas.
            </Parrafo>

            <CodigoBoton ejecutar={getDataCorrelacion} visible={false} />
          </Box>
        </Box>
      </Grid>

      <Tabla
        dataColumnas={dataCorrelacion[0]}
        dataFilas={dataCorrelacion[1]}
        visible={visibleDataCorrelacion}
      />

      <Grid item xs={12} sm={12} md={12}>
        <Box sx={{ padding: 2 }}>
          <Box sx={{ p: 2, border: "5px dashed plum" }}>
            <Parrafo>Mapa de calor de correlaciones</Parrafo>
            <CodigoBoton ejecutar={getDataCorrelacionMapa} visible={false} />
          </Box>
        </Box>
      </Grid>

      <HeatMap
        data={dataCorrelacionMapa}
        visible={visibleDataCorrelacionMapa}
      />
    </Grid>
  );
}
