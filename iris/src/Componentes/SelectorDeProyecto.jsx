import * as React from "react";
import { Select, FormControl, MenuItem, InputLabel, Box } from "@mui/material";

export default function SelectorDeProyecto(Props) {
  const [proyecto, setProyecto] = React.useState("");

  const handleChange = (event) => {
    setProyecto(event.target.value);
    Props.setId(event.target.value);
  };

  return (
    <Box sx={{ maxWidth: 250, minWidth: 250 }}>
      <FormControl fullWidth>
        <InputLabel id="Proyectos">Proyectos</InputLabel>
        <Select
          labelId="Proyectos"
          id="Proyectos"
          value={proyecto}
          label="Proyectos"
          onChange={handleChange}
        >
          {Props.proyectos.map((proyecto, index) => (
            <MenuItem value={proyecto[0]}>{proyecto[1]}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
