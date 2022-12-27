import {
  InputLabel,
  InputAdornment,
  Input,
  FormControl,
} from "@mui/material";

//Iconos
import InputIcon from "@mui/icons-material/Input";

export default function Comando(Props) {
  function cargaComando(e) {
    Props.setComando(e.target.value);
  }
  return (
    <FormControl variant="standard" sx={{ padding: 2 }}>
      <InputLabel color={"secondary"} sx={{ color: "black" }}>
        {Props.Label}
      </InputLabel>
      <Input
        id="Editor"
        type={Props.type}
        color={"secondary"}
        value={Props.comando}
        onChange={cargaComando}
        startAdornment={
          <InputAdornment position="start">
            <InputIcon />
          </InputAdornment>
        }
      />
    </FormControl>
  );
}
