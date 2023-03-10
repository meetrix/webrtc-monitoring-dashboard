import React, { useState } from 'react';
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  OutlinedInputProps,
  Theme,
  Tooltip,
} from '@mui/material';
import { withStyles, WithStyles, createStyles } from '@mui/styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import clsx from 'clsx';
import { Typography } from '../Typography';

const styles = (theme: Theme) => {
  return createStyles({
    root: {
      width: '100%',
      // height: '56px',
      margin: theme.spacing(2, 0),
      '& .MuiOutlinedInput-input': {
        padding: '10px 0.5rem !important',
      },
      '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.secondary.dark,
        opacity: 38,
      },
      '&:hover': {
        borderColor: theme.palette.secondary.dark,
        opacity: 38,
      },
      '& .MuiFormLabel-root.Mui-focused': {
        color: theme.palette.secondary.dark,
      },
      '& .MuiInputLabel-outlined': {
        transform: 'translate(14px, 10px) scale(1)',
      },
      '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
        transform: 'translate(14px, -6px) scale(0.75)',
      },
      // '& legend': {
      //   width: '0 !important',
      // },
    },
    helperText: {
      position: 'absolute',
      bottom: '-20px',
    },
    tooltip: {
      background: '#d6d6d6',
      marginTop: '4px !important',
      color: theme.palette.common.black,
      border: '1px solid #DAE3FA',
      fontWeight: 'bold',
    },
  });
};

export interface IPasswordTextField
  extends WithStyles<OutlinedInputProps & typeof styles> {
  id?: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  onKeyDown?:
    | React.KeyboardEventHandler<HTMLTextAreaElement | HTMLInputElement>
    | undefined;
  placeholder?: string;
  value?: unknown;
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  error?: boolean;
  disabled?: boolean;
  required?: boolean;
  customStyles?: string;
  tooltipOpen?: boolean;
}

export const PasswordTextField: React.FC<IPasswordTextField> = ({
  classes,
  id,
  label,
  placeholder,
  value,
  onChange,
  onKeyDown,
  helperText,
  error = false,
  disabled = false,
  required = false,
  customStyles,
  tooltipOpen,
}: IPasswordTextField) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const tipText =
    'Password must be at least 8 characters long,\nat least one number,\nboth lower and uppercase letters,\nand at least one special character';

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <FormControl
      id={id}
      className={clsx(classes.root, customStyles)}
      variant="outlined"
    >
      {label && (
        <InputLabel htmlFor="outlined-adornment-password">{label}</InputLabel>
      )}
      <Tooltip
        title={<span style={{ whiteSpace: 'pre-line' }}>{tipText}</span>}
        open={tooltipOpen}
        classes={{
          tooltip: classes.tooltip,
        }}
        placement="bottom-end"
      >
        <OutlinedInput
          id="outlined-adornment-password"
          label={label}
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          error={error}
          disabled={disabled}
          required={required}
          onKeyDown={onKeyDown}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
                size="small"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
      </Tooltip>
      <Typography variant="body2" color="error" className={classes.helperText}>
        {error && helperText}
      </Typography>
    </FormControl>
  );
};

export default withStyles(styles)(PasswordTextField);
