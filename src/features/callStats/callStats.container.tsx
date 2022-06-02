/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-empty-interface */
import React, { memo } from 'react';
import { getUrlParams } from '../../utils/urlUtils';
import CallStats from './callStats.view';
import { mockCallStats } from '../../mocks/report';

export interface ICallStatsAsyncContainer {}

const CallStatsAsyncContainer: React.FC<ICallStatsAsyncContainer> = ({}: ICallStatsAsyncContainer) => {
  const { clientId, domain, mockStats } = getUrlParams();

  const CallStatMock = mockStats ? mockCallStats : null;

  return <CallStats callStatList={CallStatMock} />;
};

export default memo(CallStatsAsyncContainer);
