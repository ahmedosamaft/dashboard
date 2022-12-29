import { Avatar, Menu, MenuItem } from '@mui/material';
import React from 'react';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';

export default function EditProfile() {
  const [cookies] = useCookies();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const open2 = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [, setActive] = React.useState({ btn1: true });

  return (
    <>
      <Avatar
        aria-expanded={open2 ? 'true' : undefined}
        onClick={handleClick}
        aria-controls={open2 ? 'basic-menu' : undefined}
        aria-haspopup="true"
        sx={{ bgcolor: 'rgb(16, 185, 129)' }}
      >
        {cookies.name?.slice(0, 2).toUpperCase()}
      </Avatar>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open2}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'profile',
        }}
        placement="left"
        sx={{ marginTop: '10px' }}
      >
        <MenuItem
          onClick={(e) => {
            handleClose(e);
            setActive({});
          }}
          component={Link}
          to="/dashboard/profile"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '5px',
          }}
        >
          <Avatar sx={{ width: '30px', height: '30px', bgcolor: '#101827' }} />
          My account
        </MenuItem>
      </Menu>
    </>
  );
}
