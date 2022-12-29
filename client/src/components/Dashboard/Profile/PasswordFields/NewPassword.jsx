import { IconButton, TextField, InputAdornment } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { useState } from 'react';
import React from 'react';

export default function NewPassword(props) {
  const [value, setValue] = useState({
    pass: '',
    showPass: false,
  });
  const { register, errors } = props;
  return (
    <TextField
      type={value.showPass ? 'text' : 'password'}
      variant="standard"
      label="New Password"
      name="password"
      {...register('password')}
      error={errors.password?.message || props.found ? true : false}
      helperText={errors.password?.message && errors.password.message}
      aria-label="Password Field"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={() => setValue({ ...value, showPass: !value.showPass })}
            >
              {value.showPass ? (
                <VisibilityOffIcon
                  color={errors.password?.message ? 'error' : 'primary'}
                />
              ) : (
                <VisibilityIcon color={value.isError ? 'error' : 'primary'} />
              )}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}
