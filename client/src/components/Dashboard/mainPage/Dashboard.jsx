import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useCookies } from 'react-cookie';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Avatar, Menu, MenuItem } from '@mui/material';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { useState } from 'react';
import LogoutAlert from './LogoutAlert';
import EditProfile from './EditProfile';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

export default function Dashboard(props) {
  const [cookies] = useCookies();
  const navigate = useNavigate();
  React.useEffect(() => {
    path === '/dashboard'
      ? setActive({ btn1: true })
      : setActive({ btn2: true });

    if (!cookies.user) navigate('/');
  }, [cookies, navigate]);

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [active, setActive] = useState({ btn1: true });

  const path = window.location.pathname;

  return (
    <>
      <Toolbar
        sx={{
          filter: 'blur(8px);',
          position: 'absloute',
          backgroundColor: '#101827',
          width: '100%',
          height: '102%',
          color: 'black',
        }}
      />
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" open={open} sx={{ backgroundColor: '#fff' }}>
          <Toolbar sx={{}}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: 'none' }),
                color: '#101827',
              }}
            >
              <MenuIcon />
            </IconButton>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <EditProfile />
              <Typography sx={{ color: '#101827', fontWeight: 'bold' }}>
                LOGO
              </Typography>
              <LogoutAlert />
            </Box>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          open={open}
          sx={{ backgroundColor: '#101827' }}
        >
          <DrawerHeader sx={{ backgroundColor: '#101827' }}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? (
                <ChevronRightIcon
                  sx={{ ...(!open && { display: 'none' }), color: 'white' }}
                />
              ) : (
                <ChevronLeftIcon
                  sx={{ ...(!open && { display: 'none' }), color: 'white' }}
                />
              )}
            </IconButton>
          </DrawerHeader>

          <List sx={{ backgroundColor: '#101827', height: '100%' }}>
            <ListItem
              key="dashboard"
              disablePadding
              sx={{ display: 'block', color: 'white' }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  color: 'white',
                  '&.active': {
                    color: 'rgb(16, 185, 129)',
                  },
                }}
                onClick={(e) => {
                  navigate('/dashboard');
                  setActive({ btn1: true });
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color: 'white',
                    '&.active': {
                      color: 'rgb(16, 185, 129)',
                    },
                  }}
                  className={active?.btn1 && 'active'}
                >
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Dashboard"
                  sx={{
                    opacity: open ? 1 : 0,
                    color: 'white',
                    '&.active': {
                      color: 'rgb(16, 185, 129)',
                    },
                  }}
                  className={active?.btn1 && 'active'}
                />
              </ListItemButton>
            </ListItem>
            <ListItem
              key="Customers"
              disablePadding
              sx={{ display: 'block', color: 'white' }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  color: 'white',
                  '&.active': {
                    color: 'rgb(16, 185, 129)',
                  },
                }}
                onClick={() => {
                  navigate('/dashboard/customers');
                  setActive({ btn2: true });
                }}
                className={active?.btn2 && 'active'}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color: 'white',
                    '&.active': {
                      color: 'rgb(16, 185, 129)',
                    },
                  }}
                  className={active?.btn2 && 'active'}
                >
                  <PeopleAltIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Customers"
                  sx={{
                    opacity: open ? 1 : 0,
                    color: 'white',
                    '&.active': {
                      color: 'rgb(16, 185, 129)',
                    },
                  }}
                  className={active?.btn2 && 'active'}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Outlet />
        </Box>
      </Box>
    </>
  );
}
