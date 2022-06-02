import React from 'react';
import {
  FormControl,
  Theme,
  TextareaAutosize,
  TextareaAutosizeProps,
} from '@mui/material';
import { withStyles, WithStyles, createStyles } from '@mui/styles';
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
        top: '-5px',
      },
      '& legend': {
        width: '0 !important',
      },
    },
    helperText: {
      margin: theme.spacing(1, 2),
    },
  });
};

export interface ITextArea
  extends WithStyles<TextareaAutosizeProps & typeof styles> {
  id?: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  placeholder?: string;
  value?: string | ReadonlyArray<string> | number;
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  error?: boolean;
  disabled?: boolean;
  required?: boolean;
  maxRows?: number | string;
  minRows?: number | string;
  customStyles?: any;
}

export const TextArea: React.FC<ITextArea> = ({
  classes,
  id,
  label,
  placeholder,
  value,
  onChange,
  customStyles,
  helperText,
  error = false,
  disabled = false,
  required = false,
  maxRows = 20,
  minRows = 10,
}: ITextArea) => {
  return (
    <FormControl
      id={id}
      className={clsx(classes.root, customStyles && customStyles)}
    >
      {label && <Typography variant="body2">{label}</Typography>}
      <TextareaAutosize
        id="TextareaAutosize"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        maxRows={maxRows}
        minRows={minRows}
      />
      <Typography variant="body2" color="error" className={classes.helperText}>
        {error && helperText}
      </Typography>
    </FormControl>
  );
};

export default withStyles(styles)(TextArea);
