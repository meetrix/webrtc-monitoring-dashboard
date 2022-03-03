/* eslint-disable react/require-default-props */
/* eslint-disable @typescript-eslint/ban-types */
import React, { memo, useState } from 'react';
import { withStyles, WithStyles } from '@mui/styles';
import { Grid } from '@mui/material';
import { TextField, PasswordTextField } from '../../components/TextField';
import { Button2 } from '../../components/Button2';
import { Typography } from '../../components/Typography';
import {
  validateEmail,
  validateName,
  validatePassword,
} from '../../helper/validation';
import styles from './auth.styles';

// interface IGeneralSettings {

// }
interface ISignupView extends WithStyles<typeof styles> {
  handleSignUp: Function;
}

const SignupView: React.FC<ISignupView> = ({
  classes,
  handleSignUp,
}: ISignupView) => {
  const [name, setName] = useState({ error: false, value: '' });
  const [email, setEmail] = useState({ error: false, value: '' });
  const [password, setPassword] = useState({ error: false, value: '' });

  const _validate = () => {
    let isValidate = true;

    if (name.error || email.error || password.error) isValidate = false;

    if (!name.value) {
      isValidate = false;
      setName({ ...name, error: true });
    }

    if (!email.value) {
      isValidate = false;
      setEmail({ ...email, error: true });
    }

    if (!password.value) {
      isValidate = false;
      setPassword({ ...password, error: true });
    }

    return isValidate;
  };

  const _handleSignupButton = () => {
    if (_validate()) {
      handleSignUp({ email: email.value, password: password.value });
    }
  };

  const _handleEnterPress = (e: { key: string }) => {
    if (e.key === 'Enter') {
      _handleSignupButton();
    }
  };

  const _nameOnChange = (e: { target: { value: string } }) => {
    const error = validateName(e.target.value);
    setName({ value: e.target.value, error });
  };

  const _emailOnChange = (e: { target: { value: string } }) => {
    const error = validateEmail(e.target.value);
    setEmail({ value: e.target.value, error });
  };

  const _passwordOnChange = (e: { target: { value: string } }) => {
    const error = validatePassword(e.target.value);
    setPassword({ value: e.target.value, error });
  };
  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} sm={7} className={classes.leftGrid}>
        <div>
          <Typography component="h3" variant="h4" className={classes.heading}>
            Please Signup with the system.
          </Typography>
          <br />
        </div>
      </Grid>
      <Grid item xs={12} sm={5} className={classes.rightGrid}>
        <div className={classes.formWrapper}>
          {/* <img
            src={generalSettings?.logo || DefaultLogo}
            alt={`${generalSettings?.companyName}-logo` || 'meetrix-logo'}
            className={classes.logo}
          /> */}
          <Typography component="h1" variant="h5" className={classes.heading}>
            Sign Up to Continue
          </Typography>
          <TextField
            id="sign-up-name"
            label="Name"
            onChange={_nameOnChange}
            error={name.error}
            helperText={name.error && 'Please insert your name.'}
            onKeyDown={_handleEnterPress}
          />
          <TextField
            id="sign-up-email"
            label="Email"
            onChange={_emailOnChange}
            error={email.error}
            helperText={email.error && 'Please insert a valid email address.'}
            onKeyDown={_handleEnterPress}
          />
          <PasswordTextField
            id="sign-up-password"
            label="Password"
            onChange={_passwordOnChange}
            error={password.error}
            helperText={password.error && 'Please insert a valid password'}
            onKeyDown={_handleEnterPress}
          />
          <Button2
            id="sign-up-button"
            align="right"
            variant="contained"
            label="Sign up"
            onClick={_handleSignupButton}
            customStyles={classes.buttonMargin}
          />
        </div>
      </Grid>
    </Grid>
  );
};

export default memo(withStyles(styles)(SignupView));
