import React, { useState } from "react";
import Input from "@mui/material/Input";
import FormControl from "@mui/material/FormControl";
import { styled } from "@mui/material/styles";
import {
  Typography,
  Button,
  Box,
  InputLabel,
  InputAdornment,
} from "@mui/material";

//Iconos
import UploadFileIcon from "@mui/icons-material/UploadFile";
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
});

export default function IngresarDataFrame() {
  const [file, setFile] = useState(null);
  const [nombreProyecto, setNombreProyecto] = useState("");
  const [descripcionProyecto, setDescripcionProyecto] = useState("");

  function cargaDatos(e) {
    setFile(e.target.files[0]);
  }

  function cargaNombreProyecto(e) {
    setNombreProyecto(e.target.value);
  }

  function cargaDescripcionProyecto(e) {
    setDescripcionProyecto(e.target.value);
  }

  function envia() {
    if (!file || nombreProyecto === "" || descripcionProyecto === "") {
      alert("Falta rellenar alguno de los campos");
      return;
    }

    const formdata = new FormData();
    formdata.append("file", file);

    var requestOptions = {
      method: "POST",
      body: formdata,
    };

    fetch("http://127.0.0.1:8000/upload/dataframe", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        alert("Se cargo el archivo");
      })
      .catch((error) => console.log("error", error));
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
      </div>
    </Box>
  );
}
