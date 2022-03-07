/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/require-default-props */
/* eslint-disable @typescript-eslint/ban-types */
import React, { memo, useState } from 'react';
import { withStyles, WithStyles } from '@mui/styles';
import { Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { TextField, PasswordTextField } from '../../components/TextField';
import { Button2 } from '../../components/Button2';
import { Typography } from '../../components/Typography';
import { validateEmail, validatePassword } from '../../helper/validation';
import styles from './auth.styles';

import { Logo as DefaultLogo } from '../../assets/icons';
import AuthLayoutView from '../../components/layout/LoginLayout';

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

  const _validate = () => {
    let isValidate = true;

    if (email.error || password.error) isValidate = false;
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

  const _emailOnChange = (e: { target: { value: string } }) => {
    const error = validateEmail(e.target.value);
    setEmail({ value: e.target.value, error });
  };

  const _passwordOnChange = (e: { target: { value: string } }) => {
    const error = validatePassword(e.target.value);
    setPassword({ value: e.target.value, error });
  };
  return (
    <AuthLayoutView>
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
      />
      <PasswordTextField
        id="sign-in-password"
        label="Password"
        onChange={_passwordOnChange}
        error={password.error}
        helperText={password.error && 'Please insert a valid password'}
        onKeyDown={_handleEnterPress}
      />
      <div className={classes.buttonWrapper}>
        <Link to="/signup" className={classes.link}>
          Create an account
        </Link>
        <Button2
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
    </AuthLayoutView>
  );
};

export default memo(withStyles(styles)(LoginView));
