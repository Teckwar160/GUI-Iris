//Bibliotecas
import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Typography, Grid, Box } from "@mui/material";

//Componentes
import Tabla from "../Componentes/Mostrar datos/Tabla";
import CodigoBoton from "../Componentes/Mostrar datos/CodigoBoton";
import Comando from "../Componentes/Editores/Comando";
import Visualizador from "../Componentes/Editores/Visualizador";
import Selector from "../Componentes/Editores/Selector";

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
  const [metodo, setMetodo] = useState("");
  const [tablaMetodo, setTablaMetodo] = useState([[], []]);
  const [visibleTablaMetodo, setVisibleTablaMetodo] = useState(false);

  // Paso 3 y Paso 4
  const [dataComponentes, setDataComponentes] = useState([]);
  const [visibleDataComponentes, setVisibleDataComponentes] = useState(false);
  const [numeroDeComponentes, setNumeroDeComponentes] = useState("");

  // Paso 5
  const [dataVarianza, setDataVarianza] = useState([]);
  const [visibleDataVarianza, setVisibleDataVarianza] = useState(false);
  const [numeroDeComponentesVarianza, setNumeroDeComponentesVarianza] =
    useState("");

  // Paso 6
  const [dataCargas, setDataCargas] = useState([]);
  const [visibleDataCargas, setVisibleDataCargas] = useState(false);

  const [variables, setVariables] = useState([]);
  const [tablaDrop, setTablaDrop] = useState([]);
  const [visibleTablaDrop, setVisibleTablaDrop] = useState(false);
  const [variablesDrop, setVariablesDrop] = useState([]);

  useEffect(() => {
    traeVariables();
    // eslint-disable-next-line
  }, []);

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
  function estandarizacion() {
    if (metodo === "") {
      alert("Selecciona un método.");
    } else {
      // Ingresamos los datos
      const formdata = new FormData();
      formdata.append("metodo", metodo);

      var requestOptions = {
        method: "POST",
        body: formdata,
      };

      fetch("http://127.0.0.1:8000/PCA/Estandar", requestOptions)
        .then((response) => {
          return response.json();
        })
        .then((result) => {
          setTablaMetodo([result[0], result[1]]);
          if (result !== [[], []]) {
            setVisibleTablaMetodo(true);
          }
        })
        .catch((error) => console.log("error", error));
    }
  }

  //Paso 3 y 4
  function getComponentes() {
    const formdata = new FormData();
    if (numeroDeComponentes === "") {
      // Ingresamos los datos
      formdata.append("numero", "None");
    } else {
      // Ingresamos los datos
      formdata.append("numero", numeroDeComponentes);
    }

    var requestOptions = {
      method: "POST",
      body: formdata,
    };

    fetch("http://127.0.0.1:8000/PCA/Componentes", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setDataComponentes([result[0], result[1]]);
        if (result !== [[], []]) {
          setVisibleDataComponentes(true);
        }
      })
      .catch((error) => console.log("error", error));
  }

  // Paso 5
  function getVarianza() {
    if (numeroDeComponentesVarianza === "") {
      alert("Favor de ingresar el comando");
    } else {
      // Ingresamos los datos
      const formdata = new FormData();
      formdata.append("numero", numeroDeComponentesVarianza);

      var requestOptions = {
        method: "POST",
        body: formdata,
      };

      fetch("http://127.0.0.1:8000/PCA/Varianza", requestOptions)
        .then((response) => {
          return response.json();
        })
        .then((result) => {
          setDataVarianza([result[0], result[1], result[2]]);
          if (result !== [[], [], []]) {
            setVisibleDataVarianza(true);
          }
        })
        .catch((error) => console.log("error", error));
    }
  }

  // Paso 6
  function getCargas() {
    // Ingresamos los datos
    const formdata = new FormData();
    formdata.append("numero", numeroDeComponentesVarianza);

    var requestOptions = {
      method: "POST",
      body: formdata,
    };

    fetch("http://127.0.0.1:8000/PCA/Paso6", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setDataCargas([result[0], result[1], result[2], result[3]]);
        if (result !== [[], [], [], []]) {
          setVisibleDataCargas(true);
        }
      })
      .catch((error) => console.log("error", error));
  }

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

  function sendDataDrop(v) {
    // Ingresamos los datos
    const formdata = new FormData();
    formdata.append("variable", v);

    var requestOptions = {
      method: "POST",
      body: formdata,
    };

    fetch("http://127.0.0.1:8000/PCA/Drop", requestOptions)
      .then((response) => {
        return response.json();
      })
      .catch((error) => console.log("error", error));
  }

  function getDataDrop() {
    var requestOptions = {
      method: "GET",
    };

    fetch("http://127.0.0.1:8000/PCA/viewDrop", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        alert("Se elimino correctamente la(s) variable(s)");
        setTablaDrop([result[0], result[1]]);
        if (result !== [[], []]) {
          setVisibleTablaDrop(true);
        }
      })
      .catch((error) => console.log("error", error));
  }

  function ejecutarDataDrop() {
    variablesDrop.map((v, i) => sendDataDrop(v));
    getDataDrop();
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
              sea mayor.
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
            <Parrafo>
              Selecciona el método de estandarización y pulsa ejecutar.
            </Parrafo>
            <Box sx={{ padding: 2 }}>
              <Selector
                label={"Método"}
                lista={["StandardScaler", "MinMaxScaler"]}
                elemento={metodo}
                setElemento={setMetodo}
              />
            </Box>
            <CodigoBoton ejecutar={estandarizacion} visible={false} />
          </Box>
        </Box>

        <Tabla
          dataColumnas={tablaMetodo[0]}
          dataFilas={tablaMetodo[1]}
          visible={visibleTablaMetodo}
        />

        {/*Paso 3 y 4*/}
        <Box sx={{ padding: 2 }}>
          <Box sx={{ p: 2, border: "5px dashed purple" }}>
            <Subtitulo>
              Pasos 3 y 4: Se calcula la matriz de covarianzas o correlaciones,
              y se calculan los componentes (eigen-vectores) y la varianza
              (eigen-valores).
            </Subtitulo>
            <Box sx={{ padding: 2 }}>
              <Comando
                Label={"Ingrese número de componentes"}
                setComando={setNumeroDeComponentes}
                comando={numeroDeComponentes}
                type={"number"}
              />
            </Box>
            <CodigoBoton ejecutar={getComponentes} visible={false} />
          </Box>
        </Box>

        <Tabla
          dataColumnas={dataComponentes[0]}
          dataFilas={dataComponentes[1]}
          visible={visibleDataComponentes}
        />

        {/*Paso 5*/}
        <Box sx={{ padding: 2 }}>
          <Box sx={{ p: 2, border: "5px dashed purple" }}>
            <Subtitulo>
              Paso 5: Se decide el número de componentes principales.
            </Subtitulo>
            <Parrafo>
              Se calcula el porcentaje de relevancia, es decir, entre el 75 y
              90% de varianza total.
            </Parrafo>

            <Box sx={{ padding: 2 }}>
              <Comando
                Label={"Ingrese número de componentes"}
                setComando={setNumeroDeComponentesVarianza}
                comando={numeroDeComponentesVarianza}
                type={"number"}
              />
            </Box>
            <CodigoBoton
              texto={"Varianza acumulada: " + dataVarianza[0]}
              ejecutar={getVarianza}
              visible={visibleDataVarianza}
            />
          </Box>
        </Box>

        <Tabla
          dataColumnas={dataVarianza[1]}
          dataFilas={dataVarianza[2]}
          visible={visibleDataVarianza}
        />

        {/*Paso 6*/}
        <Box sx={{ padding: 2 }}>
          <Box sx={{ p: 2, border: "5px dashed purple" }}>
            <Subtitulo>
              Paso 6: Se examina la proporción de relevancias.
            </Subtitulo>
            <Parrafo>
              Se revisan los valores absolutos de los componentes principales
              seleccionados. Cuanto mayor sea el valor absoluto, más importante
              es esa variable en el componente principal.
            </Parrafo>
            <CodigoBoton ejecutar={getCargas} visible={false} />
          </Box>
        </Box>

        <Tabla
          dataColumnas={dataCargas[0]}
          dataFilas={dataCargas[1]}
          visible={visibleDataCargas}
        />

        <Tabla
          dataColumnas={dataCargas[2]}
          dataFilas={dataCargas[3]}
          visible={visibleDataCargas}
        />

        <Box sx={{ padding: 2 }}>
          <Box sx={{ p: 2, border: "5px dashed plum" }}>
            <Parrafo>
              Selecciona la(s) variable(s) que quieras eliminar y pulsa
              ejecutar.
            </Parrafo>
            <Box sx={{ padding: 2 }}>
              <Visualizador
                lista={variables}
                listaSeleccionada={variablesDrop}
                actualizaSeleccion={setVariablesDrop}
              />
            </Box>

            <CodigoBoton ejecutar={ejecutarDataDrop} visible={false} />
          </Box>
        </Box>

        <Tabla
          dataColumnas={tablaDrop[0]}
          dataFilas={tablaDrop[1]}
          visible={visibleTablaDrop}
        />
      </Grid>
    </Grid>
  );
}
