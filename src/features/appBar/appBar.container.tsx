/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-empty-interface */
import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { setHeader } from '../../app/axios';
import { setToken } from '../../helper/localStorage';
import { selectAuth, actions as authAction } from '../auth/auth.slice';
// import { ScheduleMeetingModal, InstantMeetingmodal } from '../scheduleMeeting';
import { AppBar } from '../../components/layout';

export interface IAppBarContainer {}

const AppBarContainer: React.FC<IAppBarContainer> = ({}: IAppBarContainer) => {
  const auth = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const _signOut = () => {
    dispatch(authAction.signOut());
    setToken('');
    setHeader('');
    navigate('/signin');
    navigate(0); // refresh the application after signout
  };

  return (
    <>
      <AppBar auth={auth} signOut={_signOut} />
      {/* 
      <ScheduleMeetingModal />
      <InstantMeetingmodal /> */}
    </>
  );
};

export default memo(AppBarContainer);
