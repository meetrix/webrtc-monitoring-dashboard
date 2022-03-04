/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/require-default-props */
/* eslint-disable @typescript-eslint/ban-types */
import React, { memo, useState } from 'react';
import { withStyles, WithStyles } from '@mui/styles';
import { Grid } from '@mui/material';
// import { Link } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { TextField, PasswordTextField } from '../../components/TextField';
import { Button2 } from '../../components/Button2';
import { Typography } from '../../components/Typography';
import {
  validateEmail,
  validateName,
  validatePassword,
  validatePhoneNumber,
} from '../../helper/validation';
import styles from './auth.styles';
import AuthLayoutView from './authLayout.view';
import { Logo as DefaultLogo } from '../../assets/icons';

interface ISignupView extends WithStyles<typeof styles> {
  handleSignUp: Function;
}

const SignupView: React.FC<ISignupView> = ({
  classes,
  handleSignUp,
}: ISignupView) => {
  const [name, setName] = useState({ error: false, value: '' });
  const [companyName, setCompanyName] = useState({ error: false, value: '' });
  const [contactNumber, setContactNumber] = useState({
    error: false,
    value: '',
  });
  const [email, setEmail] = useState({ error: false, value: '' });
  const [password, setPassword] = useState({ error: false, value: '' });
  const [repeatPassword, setRepeatPassword] = useState({
    error: false,
    value: '',
  });

  const _validate = () => {
    let isValidate = true;

    if (name.error || email.error || password.error) isValidate = false;

    if (!name.value) {
      isValidate = false;
      setName({ ...name, error: true });
    }

    if (!companyName.value) {
      isValidate = false;
      setCompanyName({ ...companyName, error: true });
    }

    if (!contactNumber.value) {
      isValidate = false;
      setContactNumber({ ...contactNumber, error: true });
    }

    if (!email.value) {
      isValidate = false;
      setEmail({ ...email, error: true });
    }

    if (!password.value) {
      isValidate = false;
      setPassword({ ...password, error: true });
    }

    if (password.value !== repeatPassword.value) {
      isValidate = false;
      setRepeatPassword({ ...repeatPassword, error: true });
    }

    return isValidate;
  };

  const _handleSignupButton = () => {
    if (_validate()) {
      handleSignUp({
        name: name.value,
        email: email.value,
        password: password.value,
      });
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
  const _companyNameOnChange = (e: { target: { value: string } }) => {
    const error = validateName(e.target.value);
    setCompanyName({ value: e.target.value, error });
  };
  const _contactOnChange = (e: { target: { value: string } }) => {
    const error = validatePhoneNumber(e.target.value);
    setContactNumber({ value: e.target.value, error });
  };

  const _emailOnChange = (e: { target: { value: string } }) => {
    const error = validateEmail(e.target.value);
    setEmail({ value: e.target.value, error });
  };
  const _passwordOnChange = (e: { target: { value: string } }) => {
    const error = validatePassword(e.target.value);
    setPassword({ value: e.target.value, error });
  };
  const _passwordRepeatOnChange = (e: { target: { value: string } }) => {
    const error = password.value !== e.target.value;
    setRepeatPassword({ value: e.target.value, error });
  };
  return (
    <AuthLayoutView>
      <img src={DefaultLogo} alt="meetrix-logo" className={classes.logo} />
      <Typography component="h1" variant="h5" className={classes.heading}>
        Create Account
      </Typography>
      <TextField
        id="sign-up-name"
        label="Your Name"
        onChange={_nameOnChange}
        error={name.error}
        helperText={name.error && 'Please insert your name.'}
        onKeyDown={_handleEnterPress}
      />
      <TextField
        id="sign-up-company"
        label="Company / Organization"
        onChange={_companyNameOnChange}
        error={companyName.error}
        helperText={companyName.error && 'Please insert company name.'}
        onKeyDown={_handleEnterPress}
      />
      <TextField
        id="sign-up-contact-number"
        label="Contact number"
        onChange={_contactOnChange}
        error={contactNumber.error}
        type="number"
        helperText={
          contactNumber.error && 'Please insert a valid contact number'
        }
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
      <PasswordTextField
        id="sign-up-repeat-assword"
        label="Repeat password"
        onChange={_passwordRepeatOnChange}
        error={repeatPassword.error}
        helperText={repeatPassword.error && 'Passwords are not matching'}
        onKeyDown={_handleEnterPress}
      />
      <div className={classes.buttonWrapper}>
        <Link to="/signin" className={classes.link}>
          Create Account
        </Link>
        <Button2
          id="sign-up-button"
          align="right"
          variant="contained"
          label="Sign up"
          onClick={_handleSignupButton}
          customStyles={classes.buttonMargin}
        />
      </div>
    </AuthLayoutView>
  );
};

export default memo(withStyles(styles)(SignupView));
