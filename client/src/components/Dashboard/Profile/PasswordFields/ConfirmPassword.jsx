import { IconButton, TextField, InputAdornment } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { useState } from 'react';
import React from 'react';

export default function ConfirmPassword({ register, errors }) {
  const [value, setValue] = useState({
    pass: '',
    showPass: false,
  });
  return (
    <TextField
      type={value.showPass ? 'text' : 'password'}
      name="confirmPassword"
      variant="standard"
      label="Confirm Password"
      {...register('confirmPassword')}
      error={errors.confirmPassword?.message ? true : false}
      aria-label="Password Field"
      helperText={
        errors.confirmPassword?.message && errors.confirmPassword?.message
      }
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={() => setValue({ ...value, showPass: !value.showPass })}
            >
              {value.showPass ? (
                <VisibilityOffIcon
                  color={errors.confirmPassword?.message ? 'error' : 'primary'}
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
