/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-empty-interface */
import React, { memo, useEffect } from 'react';
import { getUrlParams } from '../../utils/urlUtils';
import DetailedView from './detailedView.view';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectDetailView,
  troubleshooterGetAllAsync,
} from './detailedView.slice';

export interface IDetailedViewContainer {}

const DetailedViewAsyncContainer: React.FC<IDetailedViewContainer> = ({}: IDetailedViewContainer) => {
  const { clientId, domain, mockStats } = getUrlParams();
  const troubleshooterDetails = useAppSelector(selectDetailView);
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   if (!mockStats) {
  //     dispatch<any>(troubleshooterGetAllAsync(2));
  //   }
  // }, [dispatch, mockStats]);
  const getTroubleshooterData = (data: any) => {
    dispatch<any>(troubleshooterGetAllAsync(data));
  };

  return (
    <DetailedView
      detailViewList={troubleshooterDetails}
      getTroubleshooterData={getTroubleshooterData}
    />
  );
};

export default memo(DetailedViewAsyncContainer);
