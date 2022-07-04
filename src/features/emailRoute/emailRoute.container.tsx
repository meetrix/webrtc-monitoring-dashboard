/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-empty-interface */
import React, { memo, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { ResetAsync, VerifyAsync, selectVerify } from './emailRoute.slice';

export interface IEmailRouteContainer {}

const EmailRouteContainer: React.FC<IEmailRouteContainer> = ({}: IEmailRouteContainer) => {
  const verify = useAppSelector(selectVerify);
  const { loading, responseStatus } = verify;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const useQuery = () => {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  };
  const query = useQuery();

  const token = query.get('token');
  const resetpassword = query.get('resetpassword');
  const accountconfirmation = query.get('accountconfirmation');

  useEffect(() => {
    if (resetpassword) {
      // User clicked on reset password email link
      dispatch<any>(ResetAsync(token));
    } else if (accountconfirmation) {
      // User clicked on account confirmation email link
      dispatch<any>(VerifyAsync(token));
    }
  }, [accountconfirmation, resetpassword, token, dispatch]);

  useEffect(() => {
    if (loading === false) {
      if (responseStatus === 'true') {
        if (resetpassword) {
          navigate(`/resetpassword?token=${token}`);
        } else if (accountconfirmation) {
          navigate('/dashboard/settings');
        }
      } else if (responseStatus === 'false') {
        if (resetpassword) {
          navigate('/resetpasswordtoken_expired');
        } else if (accountconfirmation) {
          navigate('/verificationtoken_expired');
        }
      }
    }
  }, [
    loading,
    responseStatus,
    resetpassword,
    accountconfirmation,
    navigate,
    token,
  ]);
  return <></>;
};

export default memo(EmailRouteContainer);
