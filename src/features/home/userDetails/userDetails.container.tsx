/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-empty-interface */
import React, { memo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUrlParams } from '../../../utils/urlUtils';
import UserDetails from './userDetails.view';
import { mockUserErrors } from '../../../mocks/report';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  selectUserErrors,
  selectUserList,
  userListAsync,
} from './userDetails.slice';

export interface IUserDetailsAsyncContainer {}

const UserDetailsAsyncContainer: React.FC<IUserDetailsAsyncContainer> = ({}: IUserDetailsAsyncContainer) => {
  const { clientId, domain, mockStats } = getUrlParams();
  const { userList } = useAppSelector(selectUserList);
  const { userErrorList } = useAppSelector(selectUserErrors);
  const dispatch = useAppDispatch();
  const { roomId } = useParams();

  useEffect(() => {
    dispatch<any>(userListAsync(roomId));
  }, []);

  const userErrorListData = mockStats ? mockUserErrors : userErrorList;

  return <UserDetails userList={userList} />;
};

export default memo(UserDetailsAsyncContainer);
