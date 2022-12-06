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
import InputIcon from "@mui/icons-material/Input";

//Colores
import { purple } from "@mui/material/colors";

// Estilos
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

export default function Comando(Props) {
  function cargaComando(e) {
    Props.setComando(e.target.value);
  }
  return (
    <FormControl variant="standard" sx={{ padding: 2 }}>
      <InputLabel color={"secondary"} sx={{ color: "black" }}>
        {Props.Label}
      </InputLabel>
      <Input
        id="Editor"
        type={Props.type}
        color={"secondary"}
        value={Props.comando}
        onChange={cargaComando}
        startAdornment={
          <InputAdornment position="start">
            <InputIcon />
          </InputAdornment>
        }
      />
    </FormControl>
  );
}
