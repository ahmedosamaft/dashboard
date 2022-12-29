import React, { useState } from 'react';
import ReactInputVerificationCode from 'react-input-verification-code';
import './PinCode.css';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { Alert, IconButton } from '@mui/material';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { LoadingButton } from '@mui/lab';
import { Stack } from '@mui/system';

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

  const [cookies, setCookie] = useCookies();

  const axiosAuth = axios.create({
    headers: {
      Authorization: `Bearer ${cookies.resetPasswordToken}`,
    },
  });
  let [flag, setFlag] = useState(false);
  let [errMsg, setErrMsg] = useState('');
  const [state, setState] = useState(false);
  const [, setData] = useState({});
  const [showOverlay, setOverlay] = useState(false);
  const submitHandler = async (e) => {
    try {
      setFlag(true);

      let res = await axiosAuth.post(
        `http://localhost:4000/api/v1/users/resetpasswordcheck`,
        { ...e }
      );
      setFlag(false);
      console.log(res);
      setCookie('pin', e.pin);
      navigate('/changePass');
    } catch (e) {
      setOverlay(true);
      setFlag(false);
      setState(true);
      setErrMsg(e.response.data.message);
      console.log(e);
    }
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="body">
      <Box
        sx={{
          display: 'flex',
          gap: '10px',
          width: { lg: '300px', md: '200px' },
          justifyContent: 'spacebetween',
          alignItems: 'center',
          flexFlow: 'column',
        }}
      >
        <Stack direction={'row'}>
          <Box className="custom-styles">
            <ReactInputVerificationCode
              autoFocus
              placeholder=""
              onCompleted={(e) => {
                setValue('pin', e);
              }}
            />
          </Box>
          <LoadingButton
            sx={{ borderRadius: '50%', width: '60px', height: '60px' }}
            loading={flag}
            type="submit"
            color={errors.pin?.message || showOverlay ? 'error' : 'primary'}
            children={<ArrowForwardIcon />}
          />
        </Stack>
        {showOverlay && <Alert severity="error">{errMsg}</Alert>}
      </Box>
    </form>
  );
}
