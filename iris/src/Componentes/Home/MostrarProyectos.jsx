import * as React from "react";
import {
  Typography,
  CardContent,
  Card,
  Box,
  Grid,
} from "@mui/material";

export default function MostrarProyectos(Props) {
  return Props.proyectos.map((proyecto, index) => (
    <Grid item xs={12} sm={12} md={6}>
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
                <Typography sx={{ fontSize: 14 }}>{proyecto[4]}</Typography>
              </CardContent>
            </React.Fragment>
          </Card>
        </Box>
      </Box>
    </Grid>
  ));
}
