/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-empty-interface */
import React, { memo } from 'react';
import IncomingConnectons from './incomingConnectons.view';
import { getUrlParams } from '../../utils/urlUtils';
import { mockIncomingConnection } from '../../mocks/report';

export interface IIncomingConnectonsAsyncContainer {}

const IncomingConnectonsAsyncContainer: React.FC<IIncomingConnectonsAsyncContainer> = ({}: IIncomingConnectonsAsyncContainer) => {
  const { clientId, domain, mockStats } = getUrlParams();

  const IncomingConnectionMock = mockStats ? mockIncomingConnection : null;

  return <IncomingConnectons tokenList={IncomingConnectionMock} />;
};

export default memo(IncomingConnectonsAsyncContainer);
