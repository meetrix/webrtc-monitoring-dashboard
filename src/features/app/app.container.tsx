/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-empty-interface */
import React, { memo, useEffect, useState } from 'react';
import { Alert } from '../../components/Alerts';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { actions, selectApp } from './app.slice';
// import { actions as scheduleMeetingActions } from '../scheduleMeeting/scheduleMeeting.slice';
// import { ScheduleMeetingModal, InstantMeetingmodal } from '../scheduleMeeting';

export interface IAppContainer {}

const AppContainer: React.FC<IAppContainer> = ({}: IAppContainer) => {
  const { alert } = useAppSelector(selectApp);
  const dispatch = useAppDispatch();

  const _handleAlertClose = () => {
    dispatch(actions.closeAlert());
  };

  return (
    <>
      {alert?.isOpen && (
        <Alert
          id="app-alert"
          type={alert?.type}
          isOpen={alert?.isOpen}
          handleClose={_handleAlertClose}
        >
          {alert?.childern}
        </Alert>
      )}
    </>
  );
};

export default memo(AppContainer);
