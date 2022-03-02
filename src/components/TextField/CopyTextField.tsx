import React, { memo } from 'react';
import clsx from 'clsx';
import {
  Button,
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
      '& .MuiOutlinedInput-root': {
        color: 'inherit',
      },
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
        // top: '-5px',
      },
      '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
        backgroundColor: '#fff',
        padding: '0 5px',
      },
      margin: theme.spacing(2, 0),
    },
    copyText: {
      color: theme.palette.primary.main,
      textTransform: 'none',
    },
  });
};

export interface ICopyTextField
  extends WithStyles<OutlinedInputProps & typeof styles> {
  id?: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  placeholder?: string;
  value: string;
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  error?: boolean;
  disabled?: boolean;
  required?: boolean;
  iconDisabled?: boolean;
  customStyles?: any;
}

export const CopyTextField: React.FC<ICopyTextField> = ({
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
  iconDisabled,
  customStyles,
}: ICopyTextField) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(value);
  };

  return (
    <FormControl
      id={id}
      className={clsx(classes.root, customStyles && customStyles)}
      variant="outlined"
    >
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
            <Button
              className={classes.copyText}
              onClick={handleCopy}
              size="small"
              disabled={iconDisabled}
            >
              Copy link
            </Button>
          </InputAdornment>
        }
      />
    </FormControl>
  );
};

export default memo(withStyles(styles)(CopyTextField));
