import {
  Link as MuiLink,
  Button,
  Stack,
  CircularProgress,
  Alert,
} from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import Password from "./Password";
import Email from "./Email";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useEffect } from "react";

const schema = yup.object().shape({
  email: yup.string().email("Email is not Vaild").required(),
  password: yup
    .string()
    .min(8, "Password Must be at least 8 Character")
    .max(24, "Max Length for Password is 24")
    .required(),
});

export default function Form() {
  const [, setData] = useState({});

  const [showOverlay, setOverlay] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [state, setState] = useState(false);

  const navigate = useNavigate();

  let [flag, setFlag] = useState(false);

  let [errMsg, setErrMsg] = useState("");

  const [cookies, setCookie] = useCookies(["user"]);

  useEffect(() => {
    if (cookies.user) navigate("/dashboard");
  }, []);

  const submitHandler = async (da) => {
    setData(da);
    setFlag(true);
    try {
      let res = await axios("http://localhost:4000/login", {
        method: "POST",
        data: da,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "*/*",
        },
      });
      console.log(res);
      setFlag(false);
      setCookie("user", res.data.user, "/");
      setCookie("id", res.data.id, "/");
      navigate("/dashboard");
    } catch (e) {
      setFlag(false);
      setOverlay(true);
      setState(true);
      console.log(e);
      setErrMsg(e.response.data.msg);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(submitHandler)}>
        <Stack spacing={2} direction={"column"}>
          <Email register={register} errors={errors} found={state} />
          <Password register={register} errors={errors} found={state} />

          <MuiLink
            underline="hover"
            component={Link}
            to="/ForgetPass"
            fontSize={"small"}
          >
            Forget Password?
          </MuiLink>
          <Button
            type="submit"
            variant="contained"
            sx={{ height: "50px" }}
            endIcon={
              flag ? (
                <CircularProgress sx={{ maxHeight: "100%" }} />
              ) : (
                <LoginIcon />
              )
            }
            disabled={flag}
          >
            {!flag && "Login"}
          </Button>
          {showOverlay && <Alert severity="error">{errMsg}</Alert>}
        </Stack>
      </form>
    </>
  );
}
