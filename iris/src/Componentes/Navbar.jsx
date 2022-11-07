import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Menu,
  MenuItem,
} from "@mui/material";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";

//Iconos
import HomeIcon from "@mui/icons-material/Home";
import DescriptionIcon from "@mui/icons-material/Description";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "../Imagenes/Logo.png";

//Estilos
const LinkInterno = styled(Link)({
  color: "black",
  textDecoration: "none",
});

//Estilos
const ThemeAppBar = styled(AppBar)({
  backgroundColor: "purple",
});

const pages = ["Home", "EDA", "PCA"];

export default function NavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <ThemeAppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <LinkInterno to={"/"}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
            >
              <img src={Logo} alt="logo" style={{ height: "50px" }} />
              <Typography
                color={"beige"}
                fontSize={"30px"}
                fontWeight={"bold"}
                sx={{ ml: 1 }}
              >
                IRIS
              </Typography>
            </IconButton>
          </LinkInterno>

          {/*Menú pequeño*/}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              sx={{ ml: -3 }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page, index) => (
                <LinkInterno to={index === 0 ? "/" : page}>
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    {index === 0 ? (
                      <HomeIcon
                        style={{ height: "30px", color: "gray" }}
                        sx={{ mr: 1 }}
                      />
                    ) : (
                      <DescriptionIcon
                        style={{ height: "30px", color: "gray" }}
                        sx={{ mr: 1 }}
                      />
                    )}
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                </LinkInterno>
              ))}
            </Menu>
          </Box>
          <LinkInterno to={"/"}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{
                display: { xs: "flex", md: "none" },
                mr: "calc(40vh)",
              }}
            >
              <img src={Logo} alt="logo" style={{ height: "50px" }} />
              <Typography
                color={"beige"}
                fontSize={"30px"}
                fontWeight={"bold"}
                sx={{ ml: 1 }}
              >
                IRIS
              </Typography>
            </IconButton>
          </LinkInterno>
          {/*Caja que se muestra siempre*/}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page, index) => (
              <LinkInterno to={index === 0 ? "/" : page}>
                <IconButton key={page} onClick={handleCloseNavMenu}>
                  {index === 0 ? (
                    <HomeIcon
                      style={{ height: "30px", color: "beige" }}
                      sx={{ mr: 1 }}
                    />
                  ) : (
                    <DescriptionIcon
                      style={{ height: "30px", color: "beige" }}
                      sx={{ mr: 1 }}
                    />
                  )}
                  <Typography
                    variant="h6"
                    style={{ height: "30px", color: "beige" }}
                    sx={{ mr: 1 }}
                  >
                    {page}
                  </Typography>
                </IconButton>
              </LinkInterno>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </ThemeAppBar>
  );
}
