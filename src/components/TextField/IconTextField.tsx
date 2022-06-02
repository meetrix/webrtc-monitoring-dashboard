import React, { memo } from 'react';
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  OutlinedInputProps,
  Theme,
} from '@mui/material';
import { withStyles, WithStyles, createStyles } from '@mui/styles';

const styles = (theme: Theme) => {
  return createStyles({
    root: {
      width: '100%',
      height: '56px',
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
        top: '-5px',
      },
      margin: theme.spacing(1, 0),
    },
  });
};

export interface IIconTextField
  extends WithStyles<OutlinedInputProps & typeof styles> {
  id?: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  placeholder?: string;
  value?: unknown;
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  error?: boolean;
  disabled?: boolean;
  required?: boolean;
  iconOnClick?: React.MouseEventHandler<HTMLButtonElement>;
  icon?: React.ReactNode;
  iconDisabled?: boolean;
}

export const IconTextField: React.FC<IIconTextField> = ({
  classes,
  id,
  label,
  placeholder,
  value,
  onChange,
  // helperText,
  error = false,
  disabled = false,
  required = false,
  iconOnClick,
  icon,
  iconDisabled,
}: IIconTextField) => {
  return (
    <FormControl id={id} className={classes.root} variant="outlined">
      {label && (
        <InputLabel htmlFor="outlined-adornment-icon">{label}</InputLabel>
      )}
      <OutlinedInput
        id="outlined-adornment-icon"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        error={error}
        disabled={disabled}
        required={required}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              onClick={iconOnClick}
              edge="end"
              size="small"
              disabled={iconDisabled}
            >
              {icon}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
};

export default memo(withStyles(styles)(IconTextField));
