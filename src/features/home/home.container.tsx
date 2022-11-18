/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-empty-interface */
import React, { memo, useEffect } from 'react';
import dayjs from 'dayjs';
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

  const todayDate = new Date();
  const [dateRange, setDateRange] = React.useState<any>([
    dayjs(todayDate).subtract(1, 'week'),
    todayDate,
  ]);

  const startDate = dayjs(dateRange[0]).format('YYYY-MM-DD');
  const endDate = dayjs(dateRange[1]).format('YYYY-MM-DD');

  useEffect(() => {
    dispatch<any>(meetingListAsync({ startDate, endDate }));
  }, [dateRange]);

  const meetingListData = mockStats ? mockHomeMeetings : meetingList;

  return (
    <Home
      meetingList={meetingListData}
      dateRange={dateRange}
      setDateRange={setDateRange}
    />
  );
};

export default memo(HomeAsyncContainer);
