import * as React from "react";
import {
  Typography,
  Button,
  CardContent,
  CardActions,
  Card,
  Box,
  Grid,
} from "@mui/material";
import { styled } from "@mui/material/styles";

//Colores
import { purple } from "@mui/material/colors";

// Iconos
import InputIcon from "@mui/icons-material/Input";

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

export default function MostrarProyectos(Props) {
  return Props.proyectos.map((proyecto, index) => (
    <Grid item xs={6} sm={6} md={6}>
      <Box sx={{ padding: 2 }}>
        <Box sx={{ p: 2, border: "5px dashed silver" }}>
          <Card variant="outlined">
            <React.Fragment>
              <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary">
                  ID: {proyecto[0]}
                </Typography>

                <Typography variant="h6" fontWeight="bold">
                  Nombre: {proyecto[1]}
                </Typography>
                <Typography color="text.secondary">Descripción</Typography>
                <Typography sx={{ fontSize: 14 }}>{proyecto[3]}</Typography>
              </CardContent>
              <CardActions>
                <Boton sx={{ mr: 1, ml: 1 }}>
                  <InputIcon />
                  <TextoBoton>Cargar proyecto</TextoBoton>
                </Boton>
              </CardActions>
            </React.Fragment>
          </Card>
        </Box>
      </Box>
    </Grid>
  ));
}
