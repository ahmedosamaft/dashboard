import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/Button";
import { Alert, CircularProgress, Stack } from "@mui/material";
import Logo from "../Logo";
import FiberPinIcon from "@mui/icons-material/FiberPin";
import Email from "../LoginPage/Email";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useCookies } from "react-cookie";

const schema = yup.object().shape({
  email: yup.string().email().required(),
});
export default function Forget() {
  const [cookies, setCookie] = useCookies();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const navigate = useNavigate();
  let [flag, setFlag] = useState(false);
  let [errMsg, setErrMsg] = useState("");
  const [state, setState] = useState(false);
  const [, setData] = useState({});
  const [showOverlay, setOverlay] = useState(false);
  const submitHandler = async (da) => {
    setData(da);
    setFlag(true);
    try {
      await axios("http://localhost:4000/login", {
        method: "POST",
        data: da,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "*/*",
        },
      });
      setFlag(false);
      setCookie("user", da.email);
      navigate("/PinCode");
    } catch (e) {
      setOverlay(true);
      setFlag(false);
      setState(true);
      setErrMsg(e.response.data.msg);
      console.log(e);
    }
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="body">
      <Stack
        spacing={2}
        direction={"column"}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Logo />
        <Email register={register} errors={errors} found={state} />
        <IconButton
          variant="contained"
          sx={{ height: "43px", width: "100%" }}
          type="submit"
          disabled={flag}
        >
          {!flag ? (
            <FiberPinIcon sx={{ width: "100%" }} />
          ) : (
            <CircularProgress />
          )}
        </IconButton>

        {showOverlay && <Alert severity="error">{errMsg}</Alert>}
      </Stack>
    </form>
  );
}
