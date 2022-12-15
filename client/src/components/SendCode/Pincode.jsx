import React from "react";
import ReactInputVerificationCode from "react-input-verification-code";
import "./PinCode.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

const schema = yup.object().shape({
  pin: yup.string().length(4).required(),
});

export default function Pincode() {
  const {
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({ resolver: yupResolver(schema) });

  const navigate = useNavigate();

  const submitHandler = (d) => {
    console.log(d);
    navigate("/changePass");
  };
  return (
    <form onSubmit={handleSubmit(submitHandler)} className="body">
      <Box
        sx={{
          display: "flex",
          gap: "10px",
          width: { lg: "300px", md: "200px" },
          justifyContent: "spacebetween",
          alignItems: "center",
        }}
      >
        <div className="custom-styles">
          <ReactInputVerificationCode
            autoFocus
            placeholder=""
            onCompleted={(e) => {
              setValue("pin", e);
            }}
          />
        </div>
        <IconButton
          type="submit"
          color={errors.pin?.message ? "error" : "primary"}
        >
          <ArrowForwardIcon />
        </IconButton>
      </Box>
    </form>
  );
}
