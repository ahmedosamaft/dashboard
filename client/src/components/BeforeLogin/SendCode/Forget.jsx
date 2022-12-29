import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/Button';
import { Alert, CircularProgress, Stack } from '@mui/material';
import Logo from '../../Logo/Logo';
import FiberPinIcon from '@mui/icons-material/FiberPin';
import Email from '../LoginPage/Email';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { LoadingButton } from '@mui/lab';

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
  let [errMsg, setErrMsg] = useState('');
  const [state, setState] = useState(false);
  const [, setData] = useState({});
  const [showOverlay, setOverlay] = useState(false);
  const submitHandler = async (da) => {
    setData(da);
    setFlag(true);
    try {
      let res = await axios.post(
        'http://localhost:4000/api/v1/users/forgetpassword',
        {
          ...da,
        }
      );
      setFlag(false);
      setCookie('resetPasswordToken', res.data.token);
      navigate('/PinCode');
    } catch (e) {
      setOverlay(true);
      setFlag(false);
      setState(true);
      setErrMsg(e.response.data.message);
      console.log(e);
    }
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <Stack
        spacing={2}
        direction={'column'}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Email register={register} errors={errors} found={state} />
        <LoadingButton
          variant="contained"
          sx={{ height: '43px', width: '120px' }}
          type="submit"
          loading={flag}
          children={<FiberPinIcon />}
        />
        {showOverlay && <Alert severity="error">{errMsg}</Alert>}
      </Stack>
    </form>
  );
}
