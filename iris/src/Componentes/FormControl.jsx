import React from "react";
import {IconButton, Typography } from "@mui/material";
import UploadFileIcon from '@mui/icons-material/UploadFile';

export default function FormControl() {
  return (
    <div>
      <input
        type="file"
        accept=".csv"
        style={{ display: "none" }}
        id="contained-button-file"
      />
      <label htmlFor="contained-button-file">
        <IconButton component="span">
            <UploadFileIcon/>
            <Typography fontFamily={"Roboto"}>Subir datos</Typography>
        </IconButton>
      </label>
    </div>
  );
}
