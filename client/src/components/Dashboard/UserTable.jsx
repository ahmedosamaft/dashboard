import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  TableContainer,
  Paper,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TableFooter,
  Button,
  CircularProgress,
} from '@mui/material';
import { Box } from '@mui/system';

export default function UserTable() {
  const [users, setUsers] = useState([]);
  const [spinner, setSpinner] = useState(true);
  useEffect(() => {
    axios
      .get('http://localhost:4000/api/v1/users')
      .then((response) => {
        setSpinner(false);
        setUsers(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log(users);
  return (
    <>
      {spinner ? (
        <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
          <CircularProgress sx={{ maxHeight: '100%' }} />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ textAlign: 'center' }}>ID</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>Email</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => {
                return (
                  <TableRow key={user._id}>
                    <TableCell sx={{ textAlign: 'center' }}>
                      {user._id}
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      {user.email}
                    </TableCell>
                    <TableCell
                      sx={{
                        display: 'flex',
                        flexGrow: 1,

                        alignItems: 'center',
                        justifyContent: 'space-evenly',
                      }}
                    >
                      <Button variant="contained" color="error">
                        Delete
                      </Button>
                      <Button variant="contained" color="success">
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}
