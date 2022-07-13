/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-empty-interface */
import React, { memo } from 'react';

import Overview from './overview.view';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectSummaryView,
  troubleshooterGetSummaryAsync,
} from './overview.slice';

export interface IOverviewAsyncContainer {}

const OverviewAsyncContainer: React.FC<IOverviewAsyncContainer> = ({}: IOverviewAsyncContainer) => {
  const troubleshooterSummary = useAppSelector(selectSummaryView);
  const dispatch = useAppDispatch();

  const getTroubleshooterData = (data: any) => {
    dispatch<any>(troubleshooterGetSummaryAsync(data));
  };

  return (
    <Overview
      summaryList={troubleshooterSummary}
      getTroubleshooterData={getTroubleshooterData}
    />
  );
};

export default memo(OverviewAsyncContainer);
