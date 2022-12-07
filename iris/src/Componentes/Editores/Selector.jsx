import * as React from "react";
import { Select, FormControl, MenuItem, InputLabel, Box } from "@mui/material";

export default function Selector(Props) {

  const handleChange = (event) => {
    Props.setElemento(event.target.value);
  };

  return (
    <Box sx={{ maxWidth: 250, minWidth: 250 }}>
      <FormControl fullWidth>
        <InputLabel color={"secondary"} sx={{ color: "black" }} id="seleccion">
          {Props.label}
        </InputLabel>
        <Select
          labelId="seleccion"
          id="seleccion"
          color={"secondary"}
          value={Props.elemento}
          label={Props.label}
          onChange={handleChange}
        >
          {Props.lista.map((el, index) => (
            <MenuItem value={el}>{el}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}