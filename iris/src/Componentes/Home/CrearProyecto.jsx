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

//Iconos
import UploadFileIcon from "@mui/icons-material/UploadFile";
import SendIcon from "@mui/icons-material/Send";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
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

export default function CrearProyecto(Props) {
  const [file, setFile] = useState(null);
  const [nombreProyecto, setNombreProyecto] = useState("");
  const [descripcionProyecto, setDescripcionProyecto] = useState("");

  function mostrarEditar() {
    Props.funcionEditar(!Props.visibleEditar);
  }

  function mostrarEliminar() {
    Props.funcionEliminar(!Props.visibleEliminar);
  }

  function mostrarCargar() {
    Props.funcionCargar(!Props.visibleCargar);
  }

  function cargaDatos(e) {
    let filePath = e.target.value;
    let allowedExtensions = /(.csv)$/i;

    if (!allowedExtensions.exec(filePath)) {
      alert("Unicamente se permiten archivos de tipo .csv.");
    } else {
      setFile(e.target.files[0]);
    }
  }

  function cargaNombreProyecto(e) {
    setNombreProyecto(e.target.value);
  }

  function cargaDescripcionProyecto(e) {
    setDescripcionProyecto(e.target.value);
  }

  function envia() {
    // Verificamos que tengamos los compos completos
    if (!file || nombreProyecto === "" || descripcionProyecto === "") {
      alert("Falta rellenar alguno de los campos");
      return;
    } else {
      // Ingresamos los datos
      const formdata = new FormData();
      formdata.append("nombre", nombreProyecto);
      formdata.append("file", file);
      formdata.append("descripcion", descripcionProyecto);

      // Reseteamos las variables
      setNombreProyecto("");
      setFile(null);
      setDescripcionProyecto("");

      // Realizamos la petición
      var requestOptions = {
        method: "POST",
        body: formdata,
      };

      fetch("http://127.0.0.1:8000/crear/Proyecto", requestOptions)
        .then((response) => {
          return response.json();
        })
        .then((result) => {
          // Indicamos que todo salio bien
          alert("Se cargo el archivo");

          // Actualizamos la lista de proyectos
          Props.actualizaProyectos();
        })
        .catch((error) => console.log("error", error));
    }
  }
  return (
    <Box>
      <div align="center">
        <Box sx={{ padding: 2 }}>
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
            <Input
              id="subirDataFrame"
              type="file"
              key={file}
              inputProps={{ accept: ".csv" }}
              onChange={cargaDatos}
              style={{ display: "none" }}
            />
            <label htmlFor="subirDataFrame">
              <Boton component="span" sx={{ mr: 1, ml: 1 }}>
                <UploadFileIcon />
                <TextoBoton>Subir DataFrame</TextoBoton>
              </Boton>
              <Boton sx={{ mr: 1, ml: 1 }} onClick={envia}>
                <SendIcon />
                <TextoBoton>Enviar</TextoBoton>
              </Boton>
            </label>
          </FormControl>
        </Box>
        <Boton sx={{ mr: 1, ml: 1 }} onClick={mostrarEditar}>
          <EditIcon />
          <TextoBoton>Editar proyecto</TextoBoton>
        </Boton>

        <Boton sx={{ mr: 1, ml: 1 }} onClick={mostrarEliminar}>
          <DeleteIcon />
          <TextoBoton>Eliminar proyecto</TextoBoton>
        </Boton>
        <Box sx={{ padding: 2 }}>
          <Boton sx={{ mr: 1, ml: 1 }} onClick={mostrarCargar}>
            <InputIcon />
            <TextoBoton>Cargar proyecto</TextoBoton>
          </Boton>
        </Box>
      </div>
    </Box>
  );
}
