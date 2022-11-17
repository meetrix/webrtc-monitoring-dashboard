/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-empty-interface */
import React, { memo, useEffect } from 'react';
import { getUrlParams } from '../../../utils/urlUtils';
import UserDetails from './userDetails.view';
import { mockUserErrors } from '../../../mocks/report';
import { useAppSelector } from '../../../app/hooks';
import { selectUserErrors } from './userDetails.slice';

export interface IUserDetailsAsyncContainer {}

const UserDetailsAsyncContainer: React.FC<IUserDetailsAsyncContainer> = ({}: IUserDetailsAsyncContainer) => {
  const { clientId, domain, mockStats } = getUrlParams();
  const { userErrorList } = useAppSelector(selectUserErrors);

  const userErrorListData = mockStats ? mockUserErrors : userErrorList;

  return <UserDetails userErrorList={userErrorListData} />;
};

export default memo(UserDetailsAsyncContainer);
