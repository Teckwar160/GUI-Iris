import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Typography,
  Button,
  Box,
  InputLabel,
  InputAdornment,
  Input,
  FormControl,
} from "@mui/material";

//Componentes
import SelectorDeProyecto from "./SelectorDeProyecto";

//Iconos
import SendIcon from "@mui/icons-material/Send";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";

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

export default function EditarProyecto(Props) {
  const [nombreProyecto, setNombreProyecto] = useState("");
  const [descripcionProyecto, setDescripcionProyecto] = useState("");
  const [idProyecto, setIdProyecto] = useState(null);

  function cargaNombreProyecto(e) {
    setNombreProyecto(e.target.value);
  }

  function cargaDescripcionProyecto(e) {
    setDescripcionProyecto(e.target.value);
  }

  function envia() {
    // Verificamos que tengamos los compos completos
    if (
      idProyecto === null ||
      nombreProyecto === "" ||
      descripcionProyecto === ""
    ) {
      alert("Falta rellenar alguno de los campos");
      return;
    } else {
      // Ingresamos los datos
      const formdata = new FormData();
      formdata.append("id", idProyecto);
      formdata.append("nombre", nombreProyecto);
      formdata.append("descripcion", descripcionProyecto);

      // Reseteamos las variables
      setIdProyecto(null);
      setNombreProyecto("");
      setDescripcionProyecto("");

      // Realizamos la petición
      var requestOptions = {
        method: "POST",
        body: formdata,
      };

      fetch("http://127.0.0.1:8000/editar/Proyecto", requestOptions)
        .then((response) => {
          return response.json();
        })
        .then((result) => {
          // Indicamos que todo salio bien
          alert("Se actualizo correctamente el proyecto");

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
              <FormControl sx={{ padding: 2 }}>
                <InputLabel>Nombre del proyecto</InputLabel>
                <Input
                  id="Nombre del proyecto"
                  type="text"
                  value={nombreProyecto}
                  onChange={cargaNombreProyecto}
                  startAdornment={
                    <InputAdornment position="start">
                      <DriveFileRenameOutlineIcon />
                    </InputAdornment>
                  }
                />
              </FormControl>

              <FormControl sx={{ padding: 2 }}>
                <InputLabel>Descripción del proyecto</InputLabel>
                <Input
                  id="Descripcion del proyecto"
                  type="text"
                  value={descripcionProyecto}
                  onChange={cargaDescripcionProyecto}
                  startAdornment={
                    <InputAdornment position="start">
                      <DriveFileRenameOutlineIcon />
                    </InputAdornment>
                  }
                />
              </FormControl>

              <FormControl variant="standard" sx={{ padding: 2 }}>
                <Boton sx={{ mr: 1, ml: 1 }} onClick={envia}>
                  <SendIcon />
                  <TextoBoton>Actualizar proyecto</TextoBoton>
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
