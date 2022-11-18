/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-empty-interface */
import React, { memo, useEffect } from 'react';
import { getUrlParams } from '../../utils/urlUtils';
import Home from './home.view';
import { mockHomeMeetings } from '../../mocks/report';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { meetingListAsync, selectMeetingList } from './home.slice';

export interface IHomeAsyncContainer {}

const HomeAsyncContainer: React.FC<IHomeAsyncContainer> = ({}: IHomeAsyncContainer) => {
  const { clientId, domain, mockStats } = getUrlParams();
  const { meetingList } = useAppSelector(selectMeetingList);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch<any>(meetingListAsync(null));
  }, []);

  const meetingListData = mockStats ? mockHomeMeetings : meetingList;

  return <Home meetingList={meetingListData} />;
};

export default memo(HomeAsyncContainer);
