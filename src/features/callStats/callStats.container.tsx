/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-empty-interface */
import React, { memo } from 'react';
import CallStats from './callStats.view';

export interface ICallStatsAsyncContainer {}

const CallStatsAsyncContainer: React.FC<ICallStatsAsyncContainer> = ({}: ICallStatsAsyncContainer) => {
  return <CallStats />;
};

export default memo(CallStatsAsyncContainer);
