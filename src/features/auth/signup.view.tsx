/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/require-default-props */
/* eslint-disable @typescript-eslint/ban-types */
import React, { memo, useState } from 'react';
import { withStyles, WithStyles } from '@mui/styles';
import { Alert } from '@mui/material';
// import { Link } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { TextField, PasswordTextField } from '../../components/TextField';
import { Button } from '../../components/Button';
import { Typography } from '../../components/Typography';
import {
  isCompanyNameValid,
  isEmailValid,
  isNameValid,
  isPasswordValid,
  isPhoneNumberValid,
} from '../../helper/validation';
import styles from './auth.styles';
import { LoginLayout } from '../../components/layout';
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
  const [errorMsg, setErrorMsg] = useState('');

  const _validate = () => {
    let isValidate = true;

    if (
      !email.value ||
      !password.value ||
      !name.value ||
      !repeatPassword.value ||
      !companyName.value
    ) {
      isValidate = false;
      setErrorMsg(
        'Please enter company or organization name, valid name, email and password'
      );
    }

    if (!email.value || !password.value) {
      isValidate = false;
      setErrorMsg('Please enter valid email and password');
    }

    return isValidate;
  };

  const _handleSignupButton = () => {
    if (_validate()) {
      handleSignUp({
        name: name.value,
        email: email.value,
        password: password.value,
        companyName: companyName.value,
        contactNumber: contactNumber.value,
      });
    }
  };
  const renderResponseMessage = () => {
    if (errorMsg) {
      return <Alert severity="error">{errorMsg}</Alert>;
    }
    return null;
  };

  const _handleEnterPress = (e: { key: string }) => {
    if (e.key === 'Enter') {
      _handleSignupButton();
    }
  };

  const _nameOnChange = (e: { target: { value: string } }) => {
    const error = isNameValid(e.target.value);
    setName({ value: e.target.value, error });
    if (errorMsg) setErrorMsg('');
  };
  const _companyNameOnChange = (e: { target: { value: string } }) => {
    const error = isCompanyNameValid(e.target.value);
    setCompanyName({ value: e.target.value, error });
    if (errorMsg) setErrorMsg('');
  };
  const _contactOnChange = (e: { target: { value: string } }) => {
    const error = isPhoneNumberValid(e.target.value);
    setContactNumber({ value: e.target.value, error });
    if (errorMsg) setErrorMsg('');
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
  const _passwordRepeatOnChange = (e: { target: { value: string } }) => {
    const error = password.value !== e.target.value;
    setRepeatPassword({ value: e.target.value, error });
    if (errorMsg) setErrorMsg('');
  };

  return (
    <LoginLayout>
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
        required
        customStyles={classes.textField}
      />
      <TextField
        id="sign-up-company"
        label="Company / Organization"
        onChange={_companyNameOnChange}
        error={companyName.error}
        helperText={companyName.error && 'Please insert company name.'}
        onKeyDown={_handleEnterPress}
        required
        customStyles={classes.textField}
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
        customStyles={classes.textField}
      />
      <TextField
        id="sign-up-email"
        label="Email"
        onChange={_emailOnChange}
        error={email.error}
        helperText={email.error && 'Please insert a valid email address.'}
        onKeyDown={_handleEnterPress}
        required
        customStyles={classes.textField}
      />
      <PasswordTextField
        id="sign-up-password"
        label="Password"
        onChange={_passwordOnChange}
        error={password.error}
        helperText={password.error && 'Please insert a valid password'}
        onKeyDown={_handleEnterPress}
        customStyles={classes.textField}
      />
      <PasswordTextField
        id="sign-up-repeat-assword"
        label="Repeat password"
        onChange={_passwordRepeatOnChange}
        error={repeatPassword.error}
        helperText={repeatPassword.error && 'Passwords are not matching'}
        onKeyDown={_handleEnterPress}
        tooltipOpen={false}
        customStyles={classes.textField}
      />
      <div className={classes.responseText}>{renderResponseMessage()}</div>
      <div className={classes.buttonWrapper}>
        <Link to="/signin" className={classes.link}>
          Sign in
        </Link>
        <Button
          id="sign-up-button"
          align="right"
          variant="contained"
          label="Sign up"
          onClick={_handleSignupButton}
          customStyles={classes.buttonMargin}
        />
      </div>
    </LoginLayout>
  );
};

export default memo(withStyles(styles)(SignupView));
