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
} from './userList.slice';
import UserListView from './userList.view';

export interface IUserListAsyncContainer {}

const UserListAsyncContainer: React.FC<IUserListAsyncContainer> = ({}: IUserListAsyncContainer) => {
  const { clientId, domain, mockStats } = getUrlParams();
  const { userList } = useAppSelector(selectUserList);
  // const { userErrorList } = useAppSelector(selectUserErrors);
  const dispatch = useAppDispatch();
  const { roomId } = useParams();

  useEffect(() => {
    dispatch<any>(userListAsync(roomId));
  }, []);

  // const userErrorListData = mockStats ? mockUserErrors : userErrorList;

  return <UserListView userList={userList} />;
};

export default memo(UserListAsyncContainer);
