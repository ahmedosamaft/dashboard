import { TextField } from "@mui/material";
import React from "react";

export default function Email(props) {
  return (
    <TextField
      variant="standard"
      label="Email"
      {...props.register("email")}
      error={props.errors.email?.message || props.found ? true : false}
      helperText={props.errors.email?.message  && props.errors.email.message }
    />
  );
}
