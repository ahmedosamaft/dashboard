import { Button, Stack } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import Password from "../LoginPage/Password";
import ConfirmPassword from "./ConfirmPassword";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

const schema = yup.object().shape({
  password: yup.string().min(8).max(24).required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null])
    .required(),
});

export default function ChangePass() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    try {
      await axios.put("http://localhost:4000/login/changePassword", {
        method: "PUT",
        data: { password: e.password },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "*/*",
        },
      });
      navigate("/dashboard");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="body">
      <Stack spacing={3} direction={"column"}>
        <Password register={register} errors={errors} />
        <ConfirmPassword register={register} errors={errors} />
        <Button variant="contained" type="submit">
          Confirm
        </Button>
      </Stack>
    </form>
  );
}
