import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { Typography, Button, Box, FormControl } from "@mui/material";

//Componentes
import SelectorDeProyecto from "./SelectorDeProyecto";

//Iconos
import DeleteIcon from "@mui/icons-material/Delete";

//Colores
import { purple } from "@mui/material/colors";

// Alertas
import Swal from "sweetalert2";

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

export default function EliminarProyecto(Props) {
  const [idProyecto, setIdProyecto] = useState(null);

  function eliminarProyecto() {
    if (idProyecto === null) {
      Swal.fire({
        text: "Selecciona un proyecto",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    } else {
      // Ingresamos los datos
      const formdata = new FormData();
      formdata.append("id", idProyecto);

      // Realizamos la petición
      var requestOptions = {
        method: "POST",
        body: formdata,
      };

      fetch("http://127.0.0.1:8000/eliminar/Proyecto", requestOptions)
        .then((response) => {
          return response.json();
        })
        .then((result) => {
          // Indicamos que todo salio bien
          Swal.fire({
            text: "Se elimino correctamente el proyecto",
            icon: "success",
            confirmButtonText: "Aceptar",
          });

          // Actualizamos la lista de proyectos
          Props.actualizaProyectos();
        })
        .catch((error) => console.log("error", error));
    }
  }

  if (Props.visible) {
    return (
      <Box sx={{ padding: 2 }}>
        <Box sx={{ p: 2, border: "5px dashed plum" }}>
          <div align="center">
            <Box sx={{ padding: 2 }}>
              <FormControl sx={{ padding: 2 }}>
                <SelectorDeProyecto
                  proyectos={Props.proyectos}
                  setId={setIdProyecto}
                />
              </FormControl>
              <FormControl variant="standard" sx={{ padding: 2 }}>
                <Boton sx={{ mr: 1, ml: 1 }} onClick={eliminarProyecto}>
                  <DeleteIcon />
                  <TextoBoton>Eliminar proyecto</TextoBoton>
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
