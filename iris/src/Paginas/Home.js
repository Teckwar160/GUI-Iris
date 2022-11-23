import { styled } from "@mui/material/styles";
import { Typography, Grid, Box } from "@mui/material";

//Componentes
import IngresarDataFrame from "../Componentes/IngresarDataFrame";

const TextoBold = styled(Typography)({
  color: "black",
  fontWeight: "bold",
  fontFamily: "Roboto",
});

export default function Home() {
  return (
    <Grid container>
      {/*Creación de proyectos*/}
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        sx={{
          minHeight: "100vh",
          backgroundColor: "white",
        }}
      >
        <Box sx={{ padding: 2 }}>
          <Box sx={{ p: 2, border: "5px dashed silver" }}>
            <TextoBold variant="h5">Crear proyecto</TextoBold>

            <Typography textAlign={"justify"}>
              Ingresa los datos requeridos para crear un proyecto o inicia uno
              que se encuentre almacenado.
            </Typography>
          </Box>
        </Box>

        <Box sx={{ padding: 2 }}>
          <Box sx={{ p: 2, border: "5px dashed silver" }}>
            <IngresarDataFrame />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
