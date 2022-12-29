import React from 'react';
import { useCookies } from 'react-cookie';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import NewPassword from './PasswordFields/NewPassword';
import ConfirmPassword from './PasswordFields/ConfirmPassword';
import { Alert, Button, Snackbar, Stack } from '@mui/material';
import { useState } from 'react';
import OldPassword from './PasswordFields/OldPassword';

export default function Profile() {
  const [cookies, setCookie] = useCookies();
  const [errMsg, setErrMsg] = useState('');
  const schema = yup.object().shape({
    lastPassword: yup
      .string()
      .required('This Field can not be empty')
      .min(8)
      .max(24),
    password: yup
      .string()
      .required('This Field can not be empty')
      .min(8)
      .max(24),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Password Must Match')
      .required('You Must enter same Password'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState({ show: false, status: 'success' });
  const axiosAuth = axios.create({
    headers: {
      Authorization: `Bearer ${cookies.user}`,
    },
  });
  const submitHandler = async (e) => {
    console.log(e);
    try {
      let res = await axiosAuth.patch(
        'http://localhost:4000/api/v1/users/updatepassword',
        { ...e }
      );
      console.log(res);
      setCookie('user', res.data.token);
      setShow({ show: true, status: 'success' });
    } catch (e) {
      console.log(e);
      setErrMsg(e.response.data.message);
      setShow({ show: true, status: 'error' });
    }
  };
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <Stack width={450} spacing={2} margin="auto">
        <OldPassword register={register} errors={errors}></OldPassword>
        <NewPassword register={register} errors={errors} />
        <ConfirmPassword register={register} errors={errors} />
        <Button
          variant="contained"
          sx={{
            '&:focus': { color: 'rgb(16, 185, 129)' },
            color: 'white',
            bgcolor: '#101827',
            '&:hover': { bgcolor: '#283857' },
          }}
          type="submit"
          onClick={handleClick}
        >
          Save Changes
        </Button>
      </Stack>
      {show.show && (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity={show.status}
            sx={{ width: '100%' }}
          >
            {show.status === 'success'
              ? 'Password Changed Successfully!'
              : `${errMsg}`}
          </Alert>
        </Snackbar>
      )}
    </form>
  );
}
