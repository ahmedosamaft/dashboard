import { Button, Stack } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Password from '../LoginPage/Password';
import ConfirmPassword from './ConfirmPassword';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const schema = yup.object().shape({
  password: yup.string().min(8).max(24).required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Password Must be identical!')
    .required(),
});

export default function ChangePass() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const [cookies, setCookie, removeCookie] = useCookies();
  const navigate = useNavigate();
  const axiosAuth = axios.create({
    headers: {
      Authorization: `Bearer ${cookies.resetPasswordToken}`,
    },
  });
  const submitHandler = async (e) => {
    let data = { ...e, pin: cookies.pin };
    try {
      let res = await axiosAuth.patch(
        `http://localhost:4000/api/v1/users/resetpassword`,
        { ...data }
      );
      removeCookie('pin');
      removeCookie('resetPasswordToken');
      setCookie('user', res.data.token);
      navigate('/dashboard');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="body">
      <Stack spacing={3} direction={'column'}>
        <Password register={register} errors={errors} />
        <ConfirmPassword register={register} errors={errors} />
        <Button variant="contained" type="submit">
          Confirm
        </Button>
      </Stack>
    </form>
  );
}
