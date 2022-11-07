import { styled } from "@mui/material/styles";
import { Typography, Grid, Box } from "@mui/material";
import Tabla from "../Componentes/Tabla";

//Estilos
const Titulo = styled(Typography)({
  color: "black",
  fontWeight: "bold",
  fontFamily: "Roboto",
  fontSize: "30px",
});

const Subtitulo = styled(Typography)({
  color: "black",
  fontWeight: "bold",
  fontFamily: "Roboto",
  fontSize: "20px",
});

const Parrafo = styled(Typography)({
  textAlign: "justify",
});

const Contenedor = styled(Box)({
  padding: 10,
  border: "1px solid silver",
});

const Codigo = styled("div")({
  border: "1px solid lightgray",
  boxShadow: "60px",
  backgroundColor: "mintcream",
  color: "Black",
});

export default function Home() {
  return (
    <Grid container>
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
          <Contenedor>
            <Titulo textAlign={"center"}>EDA</Titulo>

            <Subtitulo>Propósito</Subtitulo>

            <Parrafo>
              Tener una idea de la estructura del conjunto de datos, identicar
              la variable objetivo y posibles técnicas de modelado.
            </Parrafo>

            <Subtitulo>
              Paso 1: Descripción de la estructura de los datos.
            </Subtitulo>

            <Tabla/>

            <Subtitulo>Paso 2: Identificación de datos faltantes.</Subtitulo>
            <Subtitulo>Paso 3: Detección de valores atípicos.</Subtitulo>
            <Subtitulo>
              Paso 4: Identificación de relaciones entre pares variables.
            </Subtitulo>
          </Contenedor>
        </Box>
      </Grid>
    </Grid>
  );
}
