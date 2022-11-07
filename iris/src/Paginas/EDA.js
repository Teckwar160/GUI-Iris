import { styled } from "@mui/material/styles";
import { Typography, Grid, Box} from "@mui/material";

const TextoBold = styled(Typography)({
  color: "black",
  fontWeight: "bold",
  fontFamily: "Roboto",
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
          backgroundColor: "beige",
        }}
      >
        <Box sx={{ padding: 2 }}>
          <Box sx={{ p: 2, border: "5px dashed silver" }}>
            <TextoBold variant="h5">EDA</TextoBold>

            <Typography textAlign={"justify"}>
              Proyecto de minería
            </Typography>

            <TextoBold variant="h6">Definiciones</TextoBold>

            <Typography textAlign={"justify"}>
              descripciones
            </Typography>


            <TextoBold variant="h6">Titulo</TextoBold>
            <Typography textAlign={"justify"}>
              Texto
            </Typography>
          </Box>
        </Box>
      </Grid>

    </Grid>
  );
}
