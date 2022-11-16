/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-empty-interface */
import React, { memo } from 'react';
import { getUrlParams } from '../../utils/urlUtils';
import Home from './home.view';
import { mockCallStats } from '../../mocks/report';
import { useAppSelector } from '../../app/hooks';
import { selectMeetingList } from './home.slice';

export interface IHomeAsyncContainer {}

const HomeAsyncContainer: React.FC<IHomeAsyncContainer> = ({}: IHomeAsyncContainer) => {
  const { clientId, domain, mockStats } = getUrlParams();
  const meetingList = useAppSelector(selectMeetingList);

  console.log('kkkkk home container', meetingList);

  const HomeMock = mockStats ? mockCallStats : null;

  return <Home />;
};

export default memo(HomeAsyncContainer);
