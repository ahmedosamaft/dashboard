import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContentText,
  DialogContent,
  Button,
} from '@mui/material';
import Logout from '@mui/icons-material/Logout';
import { useCookies } from 'react-cookie';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { useState } from 'react';

export default function LogoutAlert() {
  const [, ,removerCookies] = useCookies();
  const logoutHandler = () => {
    setOpen(false);
    removerCookies('user');
    removerCookies('name');
  };
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        aria-describedby="Logout Button"
        variant="contained"
        sx={{
          bgcolor: '#101827',
          '&:hover': {
            bgcolor: '#283857',
          },
        }}
        onClick={() => setOpen(true)}
        endIcon={<Logout />}
      >
        Logout
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Are You Sure to logout?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You are going to logout, Make sure you save all your changes!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            aria-label="logout"
            color="success"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            aria-label="logout"
            color="error"
            onClick={logoutHandler}
            autoFocus
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
