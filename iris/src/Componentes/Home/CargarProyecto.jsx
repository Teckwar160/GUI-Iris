import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { Typography, Button, Box, FormControl } from "@mui/material";

//Componentes
import SelectorDeProyecto from "./SelectorDeProyecto";

//Iconos
import InputIcon from "@mui/icons-material/Input";

//Colores
import { purple } from "@mui/material/colors";

//Estilos
const Boton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[400],
  "&:hover": {
    backgroundColor: purple[600],
  },
}));

const TextoBoton = styled(Typography)({
  fontFamily: "Roboto",
  fontWeight: "bold",
  fontSize: "14px",
});

export default function CargarProyecto(Props) {
  const [idProyecto, setIdProyecto] = useState(null);

  function cargarProyecto() {
    if (idProyecto === null) {
      alert("Selecciona un proyecto");
    } else {
      // Ingresamos los datos
      const formdata = new FormData();
      formdata.append("id", idProyecto);

      // Realizamos la petición
      var requestOptions = {
        method: "POST",
        body: formdata,
      };

      fetch("http://127.0.0.1:8000/cargar/Proyecto", requestOptions)
        .then((response) => {
          return response.json();
        })
        .then((result) => {
          // Indicamos que todo salio bien
          alert("Se cargo correctamente el proyecto");

          // Actualizamos la lista de proyectos
          Props.actualizaProyectos();
        })
        .catch((error) => console.log("error", error));
    }
  }

  if (Props.visible) {
    return (
      <Box sx={{ padding: 2 }}>
        <Box sx={{ p: 2, border: "5px dashed silver" }}>
          <div align="center">
            <Box sx={{ padding: 2 }}>
              <FormControl sx={{ padding: 2 }}>
                <SelectorDeProyecto
                  proyectos={Props.proyectos}
                  setId={setIdProyecto}
                />
              </FormControl>
              <FormControl variant="standard" sx={{ padding: 2 }}>
                <Boton sx={{ mr: 1, ml: 1 }} onClick={cargarProyecto}>
                  <InputIcon/>
                  <TextoBoton>Cargar proyecto</TextoBoton>
                </Boton>
              </FormControl>
            </Box>
          </div>
        </Box>
      </Box>
    );
  } else {
    return null;
  }
}
