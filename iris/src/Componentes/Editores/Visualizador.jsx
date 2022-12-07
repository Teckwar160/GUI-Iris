import * as React from "react";
import { Checkbox, FormControlLabel, FormGroup, Box } from "@mui/material";

export default function Visualizador(Props) {
  const handleChange = (event) => {
    let tmp = Props.listaSeleccionada;
    if (event.target.checked) {
      // Agregamos un elemento al array
      tmp.push(event.target.value);
    }else{
      // Eliminamos el elementos
      tmp.splice(tmp.indexOf(event.target.value),1)
    }
    console.log(tmp)
    Props.funcion(tmp)
  };
  return (
    <Box sx={{ maxWidth: 250, minWidth: 250 }}>
      <FormGroup>
        {Props.variables.map((variable, index) => (
          <FormControlLabel
            control={<Checkbox onChange={handleChange} value={variable} />}
            label={variable}
          />
        ))}
      </FormGroup>
    </Box>
  );
}
