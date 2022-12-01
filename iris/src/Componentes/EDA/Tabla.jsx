import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function Tabla(props) {
  if (props.dataColumnas === null){
    return null
  } else{
    return (
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
                  <TableCell align="center">{f.toLocaleString()}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

}
