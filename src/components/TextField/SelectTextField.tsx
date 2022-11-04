import React, { memo } from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  TextFieldProps,
  Theme,
} from '@mui/material';
import { withStyles, WithStyles, createStyles } from '@mui/styles';

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
        backgroundColor: theme.palette.common.white,
        padding: '0 5px',
      },
    },
    select: {
      '& em': {
        fontStyle: 'unset !important',
      },
    },
  });
};

export interface ISelectTextFieldProps
  extends WithStyles<TextFieldProps & typeof styles> {
  id?: string;
  onChange?: any;
  value: string | number;
  label?: string;
  selectItems: Array<any> | any;
}

const SelectTextField: React.FC<ISelectTextFieldProps> = ({
  classes,
  id,
  label,
  value,
  onChange,
  selectItems,
}: ISelectTextFieldProps) => {
  return (
    <FormControl variant="outlined" className={classes.root}>
      <InputLabel id={id}>{label}</InputLabel>
      <Select
        defaultValue={value}
        onChange={onChange}
        placeholder={label}
        className={classes.select}
      >
        {selectItems.map((data: any, index: any) => {
          console.log('kkkk index', { index, data });
          return (
            <MenuItem value={index}>
              <em>{data.label}</em>
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default memo(withStyles(styles)(SelectTextField));
