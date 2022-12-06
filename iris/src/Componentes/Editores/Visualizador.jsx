import * as React from "react";
import { Select, FormControl, MenuItem, InputLabel, Box } from "@mui/material";

export default function Visualizador(Props) {
  const [variable, setVariable] = React.useState("");

  const handleChange = (event) => {
    setVariable(event.target.value);
    Props.funcion(event.target.value);
  };

  return (
    <Box sx={{ maxWidth: 250, minWidth: 250 }}>
      <FormControl fullWidth>
        <InputLabel color={"secondary"} sx={{ color: "black" }} id="Variables">
          Variables
        </InputLabel>
        <Select
          labelId="Variables"
          id="Variables"
          color={"secondary"}
          value={variable}
          label="Variables"
          onChange={handleChange}
        >
          {Props.variables.map((variable, index) => (
            <MenuItem value={variable}>{variable}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
