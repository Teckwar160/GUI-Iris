import * as React from "react";
import {
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  Grid,
  Box,
} from "@mui/material";

export default function Tabla(props) {
  if (props.visible) {
    return (
      <Grid item xs={12} sm={12} md={12}>
        <Box sx={{ padding: 2 }}>
          <Box sx={{ p: 2, border: "5px dashed plum" }}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    {props.dataColumnas.map((columna, index) => (
                      <TableCell align="center">{columna}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props.dataFilas.map((fila, index) => (
                    <TableRow>
                      {fila.map((f, i) => (
                        <TableCell align="center">
                          {f.toLocaleString()}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Grid>
    );
  } else {
    return null;
  }
}
