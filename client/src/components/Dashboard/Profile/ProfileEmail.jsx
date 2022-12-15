import { TextField } from "@mui/material";
import React from "react";

export default function ProfileEmail(props) {
  return <TextField variant="standard" label="Email" value={props.email} />;
}
