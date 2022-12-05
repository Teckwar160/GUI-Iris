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
import TerminalIcon from "@mui/icons-material/Terminal";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";

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
    <Box sx={{ padding: 2 }}>
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
              <DriveFileRenameOutlineIcon />
            </InputAdornment>
          }
        />
      </FormControl>
    </Box>
  );
}
