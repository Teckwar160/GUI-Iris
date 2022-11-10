import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { dataColumnas, dataFilas } from "../API/datosEDA";

export default function Tabla() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {dataColumnas.map((columna, index) => (
              <TableCell align="center">{columna}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {dataFilas.map((fila, index) => (
            <TableRow>
              {fila.map((f, i) => (
                <TableCell>{f}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
