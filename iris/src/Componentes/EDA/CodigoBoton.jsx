import { styled } from "@mui/material/styles";
import { Typography, Box, Button } from "@mui/material";

//Iconos
import TerminalIcon from "@mui/icons-material/Terminal";

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

const Codigo = styled("div")({
  border: "1px solid lightgray",
  boxShadow: "60px",
  backgroundColor: "mintcream",
  color: "Black",
});

export default function CodigoBoton(Props) {
  if (Props.visible === false) {
    return (
      <Box sx={{ padding: 1 }}>
        <Boton variant="outlined" onClick={Props.ejecutar}>
          <TerminalIcon />
          <TextoBoton sx={{ ml: 1 }}>Ejecutar</TextoBoton>
        </Boton>
      </Box>
    );
  } else {
    return (
      <Box>
        <Box sx={{ padding: 1 }}>
          <Codigo>
            <Typography sx={{ ml: 2 }}>
              <pre style={{ fontFamily: "inherit" }}>{Props.codigo}</pre>
            </Typography>
          </Codigo>
        </Box>

        <Box sx={{ padding: 1 }}>
          <Boton variant="outlined" onClick={Props.ejecutar}>
            <TerminalIcon />
            <TextoBoton sx={{ ml: 1 }}>Ejecutar</TextoBoton>
          </Boton>
        </Box>
      </Box>
    );
  }
}
