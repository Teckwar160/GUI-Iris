import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Typography, Grid, Box } from "@mui/material";

//Componentes
import CrearProyecto from "../Componentes/Home/CrearProyecto";
import MostrarProyectos from "../Componentes/Home/MostrarProyectos";
import EditarProyecto from "../Componentes/Home/EditarProyecto";
import EliminarProyecto from "../Componentes/Home/EliminarProyecto";
import CargarProyecto from "../Componentes/Home/CargarProyecto";

// Estilos

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

export default function Home() {
  const [proyectos, setProyectos] = useState([]);
  const [visibleEditar, setVisibleEditar] = useState(false);
  const [visibleEliminar, setVisibleEliminar] = useState(false);
  const [visibleCargar, setVisibleCargar] = useState(false);

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
        backgroundColor: "whitesmoke",
      }}
    >
      {/*Creación de proyectos*/}
      <Grid item xs={12} sm={12} md={12}>
        {/*Titulo*/}
        <Box sx={{ padding: 2 }}>
          <Box sx={{ p: 2, border: "5px dashed purple" }}>
            <Subtitulo>Crear proyecto</Subtitulo>

            <Parrafo>
              Ingresa los datos requeridos para crear un proyecto o inicia uno
              que se encuentre almacenado.
            </Parrafo>
          </Box>
        </Box>

        {/*Componente para subir los proyectos*/}
        <Box sx={{ padding: 2 }}>
          <Box sx={{ p: 2, border: "5px dashed plum" }}>
            <CrearProyecto
              actualizaProyectos={traeProyectos}
              visibleEditar={visibleEditar}
              funcionEditar={setVisibleEditar}
              visibleEliminar={visibleEliminar}
              funcionEliminar={setVisibleEliminar}
              visibleCargar={visibleCargar}
              funcionCargar={setVisibleCargar}
            />
          </Box>
        </Box>
        <EditarProyecto
          visible={visibleEditar}
          proyectos={proyectos}
          actualizaProyectos={traeProyectos}
        />
        <EliminarProyecto
          visible={visibleEliminar}
          proyectos={proyectos}
          actualizaProyectos={traeProyectos}
        />
        <CargarProyecto
          visible={visibleCargar}
          proyectos={proyectos}
          actualizaProyectos={traeProyectos}
        />
      </Grid>

      <Grid item xs={12} sm={12} md={12}>
        {/*Titulo*/}
        <Box sx={{ padding: 2 }}>
          <Box sx={{ p: 2, border: "5px dashed purple" }}>
            <Subtitulo>Proyectos Creados</Subtitulo>
            <Parrafo>Lista de proyectos creados.</Parrafo>
          </Box>
        </Box>
      </Grid>

      {/*Componente para mostrar los proyectos*/}
      <MostrarProyectos proyectos={proyectos} />
    </Grid>
  );
}
