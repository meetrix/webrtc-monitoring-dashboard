/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-empty-interface */
import React, { memo } from 'react';
import Overview from './overview.view';

export interface IOverviewAsyncContainer {}

const OverviewAsyncContainer: React.FC<IOverviewAsyncContainer> = ({}: IOverviewAsyncContainer) => {
  return <Overview />;
};

export default memo(OverviewAsyncContainer);
