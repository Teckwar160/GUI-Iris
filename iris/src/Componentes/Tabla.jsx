import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { dataColumnas, dataFilas } from "../API/datosEDA";
function creaFilas(columnas, filas) {
  // console.log(dataColumnas.length) //21
  var filasRetorno = [];
  var iterador = dataFilas.length;
  var j = 0;
  var tmp = {};
  while (j < iterador) {
    for (var i = 0; i < dataColumnas.length; i++) {
      tmp[dataColumnas[i]] = dataFilas[j];
      j++;
    }
    j++;
    filasRetorno.push(tmp);
    tmp = {};
  }
  return filasRetorno;
}

const filas2 = creaFilas(dataColumnas, dataFilas);

console.log(filas2);

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
          {filas2.map((fila, index) => (
            <TableRow
              key={fila.Suburb}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{fila.Suburb}</TableCell>
              <TableCell>{fila.Address}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
