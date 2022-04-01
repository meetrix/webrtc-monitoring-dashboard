/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-empty-interface */
import React, { memo } from 'react';
import IncomingConnectons from './incomingConnectons.view';
import { getUrlParams } from '../../utils/urlUtils';
import { mockCallStats } from '../../mocks/report';
import { useGetReportQuery } from '../../services/apiService/endpoints/reportEndpoints';

export interface IIncomingConnectonsAsyncContainer {}

const IncomingConnectonsAsyncContainer: React.FC<IIncomingConnectonsAsyncContainer> = ({}: IIncomingConnectonsAsyncContainer) => {
  const { clientId, domain, mockStats } = getUrlParams();
  const { data, error, isLoading } = useGetReportQuery({
    domain: 'meetrix.io',
    clientId: clientId || '1234',
  });

  const connectionData = [
    {
      title: 'Connection',
      body: [
        {
          key: 'Status',
          value: 'test value',
        },
      ],
    },
  ];

  const callStats = mockStats ? mockCallStats : data;

  console.log('kkkkkk', connectionData);

  return <IncomingConnectons />;
};

export default memo(IncomingConnectonsAsyncContainer);
