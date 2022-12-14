//Bibliotecas
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { Typography, Grid, Box } from "@mui/material";

//Componentes
import Tabla from "../Componentes/Mostrar datos/Tabla";
import CodigoBoton from "../Componentes/Mostrar datos/CodigoBoton";

//Graficas
import Barra from "../Graficas/Barra";
import Caja from "../Graficas/Caja";
import HeatMap from "../Graficas/HeatMap";

// Alertas
import Swal from "sweetalert2";

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
        if (result !== false) {
          setForma([result[0], result[1]]);
          setVisibleForma(true);
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

  function getTiposDeDatos() {
    var requestOptions = {
      method: "GET",
    };

    fetch("http://127.0.0.1:8000/EDA/TiposDeDatos", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        if (result !== false) {
          setTiposDatos([result[0], result[1]]);
          setVisibleTiposDatos(true);
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
        if (result !== false) {
          setDataHistograma(result);
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

  function getDataBox() {
    var requestOptions = {
      method: "GET",
    };

    fetch("http://127.0.0.1:8000/EDA/Box", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        if (result !== false) {
          setDataBox(result);
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

  function getDataHistogramasObject() {
    var requestOptions = {
      method: "GET",
    };

    fetch("http://127.0.0.1:8000/EDA/DataHistogramas/Object", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        if (result !== false) {
          setDataHistogramaObject(result);
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
        if (result !== false) {
          setDataCorrelacion(result);
          setVisibleDataCorrelacion(true);
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

            <Subtitulo>Prop??sito</Subtitulo>

            <Parrafo>
              Tener una idea de la estructura del conjunto de datos, identicar
              la variable objetivo y posibles t??cnicas de modelado.
            </Parrafo>
          </Box>
        </Box>

        {/*Previsualizaci??n de datos*/}
        <Box sx={{ padding: 2 }}>
          <Box sx={{ p: 2, border: "5px dashed plum" }}>
            <Subtitulo>Previsualizaci??n de datos</Subtitulo>
            <CodigoBoton ejecutar={vistaPrevia} codigo={""} visible={false} />
          </Box>
        </Box>

        <Tabla
          dataColumnas={dataVistaPrevia[0]}
          dataFilas={dataVistaPrevia[1]}
          visible={visibleVistaPrevia}
        />

        {/*Paso 1*/}
        <Box sx={{ padding: 2 }}>
          <Box sx={{ p: 2, border: "5px dashed purple" }}>
            <Subtitulo>
              Paso 1: Descripci??n de la estructura de los datos.
            </Subtitulo>
          </Box>
        </Box>
        <Box sx={{ padding: 2 }}>
          <Box sx={{ p: 2, border: "5px dashed plum" }}>
            <Bold>a) Forma (dimensiones) del DataFrame.</Bold>

            <CodigoBoton
              ejecutar={getForma}
              texto={"(" + forma[0] + "," + forma[1] + ")"}
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
            <Subtitulo>Paso 2: Identificaci??n de datos faltantes.</Subtitulo>
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
            <Subtitulo>Paso 3: Detecci??n de valores at??picos.</Subtitulo>
          </Box>
        </Box>
        <Box sx={{ padding: 2 }}>
          <Box sx={{ p: 2, border: "5px dashed plum" }}>
            <Bold>a) Distribuci??n de variables num??ricas</Bold>
            <Parrafo>Histogramas que agrupan los n??meros en rangos.</Parrafo>
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
            <Bold>b) Resumen estad??stico de variables num??ricas</Bold>
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
            <Bold>c) Diagramas para detectar posibles valores at??picos</Bold>
            <Parrafo>Diagramas de cajas.</Parrafo>

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
            <Bold>d) Distribuci??n de variables categ??ricas</Bold>
            <Parrafo>
              Se refiere a la observaci??n de las clases de cada columna
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
            <Parrafo>
              Histograma para variables categ??ricas. (Unicamente variables con
              menos de 10 elementos diferentes.)
            </Parrafo>

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
              Paso 4: Identificaci??n de relaciones entre pares variables.
            </Subtitulo>
          </Box>
        </Box>

        <Box sx={{ padding: 2 }}>
          <Box sx={{ p: 2, border: "5px dashed plum" }}>
            <Parrafo>Matriz de correlaciones.</Parrafo>

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
            <Parrafo>Mapa de calor de correlaciones.</Parrafo>
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
