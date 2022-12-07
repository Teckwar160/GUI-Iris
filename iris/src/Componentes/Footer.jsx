import { styled } from "@mui/material/styles";
import { Typography, Grid, Box, Button } from "@mui/material";

// Iconos
import GitHubIcon from "@mui/icons-material/GitHub";

// Imagenes
import LogoReact from "../Imagenes/React.png";
import LogoMUI from "../Imagenes/MUI.png";
import LogoNivo from "../Imagenes/Nivo.png";

// Colores
import { purple } from "@mui/material/colors";

// Estilos
const CustomFooter = styled("footer")({
  color: "black",
  margin: 0,
  padding: 20,
  position: "sticky",
  background: "purple",
});

const CustomLink = styled("a")({
  color: "black",
  textDecoration: "none",
});

const Boton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[700]),
  "&:hover": {
    backgroundColor: purple[600],
  },
}));

export default function Footer() {
  return (
    <CustomFooter>
      <Grid container>
        {/*Primer Columna*/}
        <Grid item xs={12} sm={12} md={6}>
          <Box sx={{ ml: 2, mr: 2 }}>
            <div align="center">
              <Typography style={{ color: "white" }} fontWeight={"bold"}>
                Proyecto final de Minería de datos
              </Typography>
              <CustomLink
                href={"https://github.com/Teckwar160/GUI-Iris"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Boton>
                  <GitHubIcon fontSize="large" />
                  <Typography fontWeight={"bold"} sx={{ ml: 1 }}>
                    Repositorio
                  </Typography>
                </Boton>
              </CustomLink>
            </div>
          </Box>
        </Grid>

        {/*Tercer Columna*/}
        <Grid item xs={12} sm={12} md={6}>
          <Box sx={{ ml: 2, mr: 2 }}>
            <div align="center">
              <Typography style={{ color: "white" }} fontWeight={"bold"}>
                Tecnologías utilizadas
              </Typography>
              <CustomLink
                href={"https://es.reactjs.org/"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Boton>
                  <img
                    src={LogoReact}
                    alt="logoReact"
                    style={{ height: "30px" }}
                  />
                  <Typography fontWeight={"bold"} sx={{ ml: 1 }}>
                    React
                  </Typography>
                </Boton>
              </CustomLink>

              <CustomLink
                href={"https://mui.com/"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Boton>
                  <img src={LogoMUI} alt="logoMUI" style={{ height: "30px" }} />
                  <Typography fontWeight={"bold"} sx={{ ml: 1 }}>
                    Material UI
                  </Typography>
                </Boton>
              </CustomLink>

              <CustomLink
                href={"https://nivo.rocks/"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Boton>
                  <img
                    src={LogoNivo}
                    alt="logoNivo"
                    style={{ height: "30px" }}
                  />
                  <Typography fontWeight={"bold"} sx={{ ml: 1 }}>
                    Nivo
                  </Typography>
                </Boton>
              </CustomLink>
            </div>
          </Box>
        </Grid>
      </Grid>
    </CustomFooter>
  );
}
