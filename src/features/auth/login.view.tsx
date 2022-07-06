/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/require-default-props */
/* eslint-disable @typescript-eslint/ban-types */
import React, { memo, useState } from 'react';
import { withStyles, WithStyles } from '@mui/styles';
import { Alert, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { TextField, PasswordTextField } from '../../components/TextField';
import { Button } from '../../components/Button';
import { Typography } from '../../components/Typography';
import { isEmailValid, isPasswordValid } from '../../helper/validation';
import styles from './auth.styles';

import { Logo as DefaultLogo } from '../../assets/icons';
import { LoginLayout } from '../../components/layout';

// interface IGeneralSettings {

// }
interface ILoginView extends WithStyles<typeof styles> {
  handleSignIn: Function;
}

const LoginView: React.FC<ILoginView> = ({
  classes,
  handleSignIn,
}: ILoginView) => {
  const [email, setEmail] = useState({ error: false, value: '' });
  const [password, setPassword] = useState({ error: false, value: '' });
  const [errorMsg, setErrorMsg] = useState('');

  const _validate = () => {
    let isValidate = true;

    if (!email.value || !password.value) {
      isValidate = false;
      setErrorMsg('Please enter valid email and password');
    }

    return isValidate;
  };

  const _handleSignInButton = () => {
    if (_validate()) {
      handleSignIn({ email: email.value, password: password.value });
    }
  };

  const _handleEnterPress = (e: { key: string }) => {
    if (e.key === 'Enter') {
      _handleSignInButton();
    }
  };

  const renderResponseMessage = () => {
    if (errorMsg) {
      return <Alert severity="error">{errorMsg}</Alert>;
    }
    return null;
  };

  const _emailOnChange = (e: { target: { value: string } }) => {
    const error = isEmailValid(e.target.value);
    setEmail({ value: e.target.value, error });
    if (errorMsg) setErrorMsg('');
  };

  const _passwordOnChange = (e: { target: { value: string } }) => {
    const error = isPasswordValid(e.target.value);
    setPassword({ value: e.target.value, error });
    if (errorMsg) setErrorMsg('');
  };
  return (
    <LoginLayout>
      <img src={DefaultLogo} alt="meetrix-logo" className={classes.logo} />
      <Typography component="h1" variant="h5" className={classes.heading}>
        Sign in to Continue
      </Typography>
      <TextField
        id="sign-in-email"
        label="Email"
        onChange={_emailOnChange}
        error={email.error}
        helperText={email.error && 'Please insert a valid email address.'}
        onKeyDown={_handleEnterPress}
        required
      />
      <PasswordTextField
        id="sign-in-password"
        label="Password"
        onChange={_passwordOnChange}
        error={password.error}
        helperText={password.error && 'Please insert a valid password'}
        onKeyDown={_handleEnterPress}
        tooltipOpen={false}
      />
      <div className={classes.responseText}>{renderResponseMessage()}</div>
      <div className={classes.buttonWrapper}>
        <Link to="/signup" className={classes.link}>
          Create an account
        </Link>
        <Button
          id="sign-up-button"
          align="right"
          variant="contained"
          label="Sign In"
          onClick={_handleSignInButton}
          customStyles={classes.buttonMargin}
        />
      </div>
      <div className={classes.forgotPasswordWrapper}>
        <Link to="/forgotpassword" className={classes.forgotPassword}>
          Forgotten password?
        </Link>
      </div>
    </LoginLayout>
  );
};

export default memo(withStyles(styles)(LoginView));
