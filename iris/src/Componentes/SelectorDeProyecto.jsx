import * as React from "react";
import { Select, FormControl, MenuItem, InputLabel, Box } from "@mui/material";

export default function SelectorDeProyecto(Props) {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Box sx={{ maxWidth: 250, minWidth: 250 }}>
      <FormControl fullWidth>
        <InputLabel id="Proyectos">Proyectos</InputLabel>
        <Select
          labelId="Proyectos"
          id="Proyectos"
          value={age}
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
