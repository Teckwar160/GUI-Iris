import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Typography, Grid, Box, Button } from "@mui/material";
import Tabla from "../Componentes/Tabla";
//import FormControl from "../Componentes/FormControl";

//Datos
//import { dataColumnas, dataFilas } from "../API/datosEDA";

//Iconos
import TerminalIcon from "@mui/icons-material/Terminal";

//Colores
import { purple } from "@mui/material/colors";

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

const Contenedor = styled(Box)({
  padding: 10,
  border: "1px solid silver",
});

const Codigo = styled("div")({
  border: "1px solid lightgray",
  boxShadow: "60px",
  backgroundColor: "mintcream",
  color: "Black",
});

const BotonEjecutar = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[400],
  "&:hover": {
    backgroundColor: purple[600],
  },
}));

const TextoBotonEjecutar = styled(Typography)({
  fontFamily: "Roboto",
  fontWeight: "bold",
});



export default function EDA() {
  const [dataColumnas, setDataColumnas] = useState([]);
  const [dataFilas, setDataFilas] = useState([]);

//Funciones
function vistaPrevia() {
  var requestOptions = {
    method: "GET"
  };

  fetch(
    "http://127.0.0.1:8000/vistaPrevia",
    requestOptions
  )
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
          <Contenedor>
            <Titulo textAlign={"center"}>EDA</Titulo>

            <Subtitulo>Propósito</Subtitulo>

            <Parrafo>
              Tener una idea de la estructura del conjunto de datos, identicar
              la variable objetivo y posibles técnicas de modelado.
            </Parrafo>

            <Subtitulo>Previsualización de datos</Subtitulo>

            <BotonEjecutar variant="outlined" onClick={vistaPrevia}>
              <TerminalIcon />
              <TextoBotonEjecutar sx={{ ml: 1 }}>Ejecutar</TextoBotonEjecutar>
            </BotonEjecutar>
            <Tabla dataColumnas={dataColumnas} dataFilas={dataFilas} />

            <Subtitulo>
              Paso 1: Descripción de la estructura de los datos.
            </Subtitulo>

            <Subtitulo>Paso 2: Identificación de datos faltantes.</Subtitulo>
            <Subtitulo>Paso 3: Detección de valores atípicos.</Subtitulo>
            <Subtitulo>
              Paso 4: Identificación de relaciones entre pares variables.
            </Subtitulo>
            <Codigo>Esto es un codigo</Codigo>
          </Contenedor>
        </Box>
      </Grid>
    </Grid>
  );
}