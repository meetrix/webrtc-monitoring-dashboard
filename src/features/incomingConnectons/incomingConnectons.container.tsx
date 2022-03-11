/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-empty-interface */
import React, { memo } from 'react';
import IncomingConnectons from './incomingConnectons.view';

export interface IIncomingConnectonsAsyncContainer {}

const IncomingConnectonsAsyncContainer: React.FC<IIncomingConnectonsAsyncContainer> = ({}: IIncomingConnectonsAsyncContainer) => {
  return <IncomingConnectons />;
};

export default memo(IncomingConnectonsAsyncContainer);
