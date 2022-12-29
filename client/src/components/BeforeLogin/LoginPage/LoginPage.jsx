import React from 'react';
import Form from './Form';
import Logo from '../../Logo/Logo';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

export default function LoginPage(props) {
  return (
    <Box
      width={'100vw'}
      height={'100vh'}
      display={'flex'}
      alignItems="center"
      justifyContent="center"
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection={'column'}
      >
        <Logo />
        <Outlet />
      </Box>
    </Box>
  );
}
