import React, { useState } from "react";
import Input from "@mui/material/Input";
import FormControl from "@mui/material/FormControl";
import { styled } from "@mui/material/styles";
import { Typography, Button } from "@mui/material";

//Iconos
import UploadFileIcon from "@mui/icons-material/UploadFile";
import SendIcon from "@mui/icons-material/Send";

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

export default function InputWithIcon() {
  const [file, setFile] = useState(null);

  function carga(e) {
    setFile(e.target.files[0]);
  }

  function envia() {
    if (!file) {
      alert("Carga algo!!!!");
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
    <FormControl variant="standard">
      <Input
        id="subirDataFrame"
        type="file"
        onChange={carga}
        style={{ display: "none" }}
      />
      <label htmlFor="subirDataFrame">
        <Boton component="span" sx={{ mr: 1, ml: 1 }}>
          <UploadFileIcon />
          <TextoBoton>Subir DataFrame</TextoBoton>
        </Boton>
        <Boton onClick={envia}>
          <SendIcon />
          <TextoBoton>Enviar</TextoBoton>
        </Boton>
      </label>
    </FormControl>
  );
}
