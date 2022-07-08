/* eslint-disable @typescript-eslint/ban-types */
import React, { memo, useState } from 'react';
import { WithStyles, withStyles } from '@mui/styles';

import { Grid, Paper } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { LinearProgress } from '../../components/Progress';

import styles from './resetPassword.styles';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { resetPasswordAsync, selectResetPassword } from './resetPassword.slice';
import { isPasswordValid } from '../../helper/validation';
import { PasswordTextField } from '../../components/TextField';
import { Button } from '../../components/Button';
import { LoginLayout } from '../../components/layout';

type IResetPasswordView = WithStyles<typeof styles>;

const ResetPassword: React.FC<IResetPasswordView> = ({
  classes,
}: IResetPasswordView) => {
  const resetPassword = useAppSelector(selectResetPassword);
  const { loading, responseStatus, responseMessage } = resetPassword;
  const dispatch = useAppDispatch();

  const handleResetPassword = (data: any) => {
    dispatch<any>(resetPasswordAsync(data));
  };

  const [newPassword, setNewPassword] = useState({
    value: '',
    isError: false,
  });
  const [confirmPassword, setConfirmPassword] = useState({
    value: '',
    isError: false,
  });

  const newPasswordOnChange = (event: { target: { value: string } }) => {
    const isError = isPasswordValid(event.target.value);
    setNewPassword({ value: event.target.value, isError });
  };

  const confirmPasswordOnChange = (event: { target: { value: string } }) => {
    const isError = isPasswordValid(event.target.value);
    setConfirmPassword({ value: event.target.value, isError });
  };

  const useQuery = () => {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  };

  const query = useQuery();

  const submitButtonOnClick = () => {
    const token = query.get('token');

    if (!newPassword.isError && !confirmPassword.isError && token) {
      handleResetPassword({
        password: newPassword.value,
        confirm: confirmPassword.value,
        token,
      });
    }
  };
  const renderResponseMessage = () => {
    if (responseMessage) {
      return (
        <div
          className={
            responseStatus === 'true' ? classes.successText : classes.errorText
          }
        >
          {responseMessage}
        </div>
      );
    }

    return null;
  };
  return (
    <LoginLayout>
      <div className={classes.formHeading}>Reset password</div>
      <PasswordTextField
        id="reset-new-password"
        label="New Password"
        onChange={newPasswordOnChange}
        value={newPassword.value}
        error={newPassword.isError}
      />
      <PasswordTextField
        id="reset-confirm-password"
        label="Confirm Password"
        onChange={confirmPasswordOnChange}
        value={confirmPassword.value}
        error={confirmPassword.isError}
        tooltipOpen={false}
      />
      {renderResponseMessage()}
      {loading && <LinearProgress />}
      <div className={classes.buttonWrapper}>
        <Button
          align="right"
          variant="contained"
          label="Submit"
          id="submit_button_in_reset_password"
          onClick={() => submitButtonOnClick()}
          disabled={newPassword.isError || confirmPassword.isError}
        />
      </div>
    </LoginLayout>
  );
};

export default memo(withStyles(styles)(ResetPassword));
