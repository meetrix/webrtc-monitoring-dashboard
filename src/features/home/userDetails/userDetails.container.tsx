/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-empty-interface */
import React, { memo, useEffect } from 'react';
import { getUrlParams } from '../../../utils/urlUtils';
import UserDetails from './userDetails.view';
import { mockHomeMeetings } from '../../../mocks/report';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { userDetailsAsync, selectUserDetails } from './userDetails.slice';

export interface IUserDetailsAsyncContainer {}

const UserDetailsAsyncContainer: React.FC<IUserDetailsAsyncContainer> = ({}: IUserDetailsAsyncContainer) => {
  const { clientId, domain, mockStats } = getUrlParams();
  const { userErrorList } = useAppSelector(selectUserDetails);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch<any>(userDetailsAsync(null));
  }, []);

  const meetingListData = mockStats ? mockHomeMeetings : userErrorList;

  return <UserDetails meetingList={meetingListData} />;
};

export default memo(UserDetailsAsyncContainer);
