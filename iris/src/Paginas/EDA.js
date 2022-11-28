//Bibliotecas
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { Typography, Grid, Box } from "@mui/material";

//Componentes
import Tabla from "../Componentes/EDA/Tabla";
import CodigoBoton from "../Componentes/EDA/CodigoBoton";

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
  const [dataColumnas, setDataColumnas] = useState([]);
  const [dataFilas, setDataFilas] = useState([]);
  const [value, setValue] = React.useState(
    "DatosMelbourne = pd.read_csv('Datos/melb_data.csv')\nDatosMelbourne"
  );

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

            <Subtitulo>Previsualización de datos</Subtitulo>

            <CodigoBoton ejecutar={vistaPrevia} codigo={value} />

            <Tabla dataColumnas={dataColumnas} dataFilas={dataFilas} />

            <Subtitulo>
              Paso 1: Descripción de la estructura de los datos.
            </Subtitulo>

            <Subtitulo>Paso 2: Identificación de datos faltantes.</Subtitulo>
            <Subtitulo>Paso 3: Detección de valores atípicos.</Subtitulo>
            <Subtitulo>
              Paso 4: Identificación de relaciones entre pares variables.
            </Subtitulo>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
