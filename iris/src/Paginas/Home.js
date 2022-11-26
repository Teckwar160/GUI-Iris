import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Typography, Grid, Box } from "@mui/material";

//Componentes
import IngresarDataFrame from "../Componentes/IngresarDataFrame";
import MostrarProyectos from "../Componentes/MostrarProyectos";
import EditarProyecto from "../Componentes/EditarProyecto";

const TextoBold = styled(Typography)({
  color: "black",
  fontWeight: "bold",
  fontFamily: "Roboto",
});

export default function Home() {
  const [proyectos, setProyectos] = useState([]);
  const [visibleEditar, setVisibleEditar] = useState(false);

  useEffect(() => {
    traeProyectos();
    // eslint-disable-next-line
  }, []);

  function traeProyectos() {
    var requestOptions = {
      method: "GET",
    };

    fetch("http://127.0.0.1:8000/trae/Proyectos", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setProyectos(result);
      })
      .catch((error) => console.log("error", error));
  }

  return (
    <Grid
      container
      sx={{
        minHeight: "100vh",
        backgroundColor: "white",
      }}
    >
      {/*Creación de proyectos*/}
      <Grid item xs={12} sm={12} md={12}>
        {/*Titulo*/}
        <Box sx={{ padding: 2 }}>
          <Box sx={{ p: 2, border: "5px dashed silver" }}>
            <TextoBold variant="h5">Crear proyecto</TextoBold>

            <Typography textAlign={"justify"}>
              Ingresa los datos requeridos para crear un proyecto o inicia uno
              que se encuentre almacenado.
            </Typography>
          </Box>
        </Box>

        {/*Componente para subir los proyectos*/}
        <Box sx={{ padding: 2 }}>
          <Box sx={{ p: 2, border: "5px dashed silver" }}>
            <IngresarDataFrame
              actualizaProyectos={traeProyectos}
              visibleEditar={visibleEditar}
              funcionEditar={setVisibleEditar}
            />
          </Box>
        </Box>
        <EditarProyecto visible={visibleEditar} proyectos={proyectos} />
      </Grid>

      {/*Componente para mostrar los proyectos*/}
      <MostrarProyectos proyectos={proyectos} />
    </Grid>
  );
}
