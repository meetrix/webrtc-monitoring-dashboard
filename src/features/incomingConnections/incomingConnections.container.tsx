/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-empty-interface */
import React, { useEffect } from 'react';
import IncomingConnections from './incomingConnections.view';
import { getUrlParams } from '../../utils/urlUtils';
import { mockIncomingConnection } from '../../mocks/report';
import {
  iceServerConfigGetAsync,
  iceServerConfigSetAsync,
  pluginCreateAsync,
  pluginGetAllAsync,
  pluginRegenerateAsync,
  pluginRevokeAsync,
  selectConfig,
  selectPlugins,
} from './incomingConnections.slice';
import { useAppSelector, useAppDispatch } from '../../app/hooks';

export interface IIncomingConnectionsAsyncContainer {}

const IncomingConnectionsAsyncContainer: React.FC<IIncomingConnectionsAsyncContainer> = ({}: IIncomingConnectionsAsyncContainer) => {
  const { clientId, domain, mockStats } = getUrlParams();

  const plugins = useAppSelector(selectPlugins);
  const dispatch = useAppDispatch();
  const iceServerConfig = useAppSelector(selectConfig);
  const { config, iceServerConfigType } = iceServerConfig;
  useEffect(() => {
    if (!mockStats) {
      dispatch<any>(pluginGetAllAsync());
    }
  }, [dispatch, mockStats]);

  const IncomingConnectionMock = mockStats ? mockIncomingConnection : plugins;

  return (
    <IncomingConnections
      actions={{
        createToken: (data: any) => {
          dispatch<any>(pluginCreateAsync(data));
        },
        revokeToken: (_id: string) => {
          dispatch<any>(pluginRevokeAsync(_id));
        },
        regenerateToken: (_id: string) => {
          dispatch<any>(pluginRegenerateAsync(_id));
        },
        setICEServerConfig: (data: any) => {
          dispatch<any>(iceServerConfigSetAsync(data));
        },
        getICEServerConfig: (data: any) => {
          dispatch<any>(iceServerConfigGetAsync(data));
        },
      }}
      tokenList={IncomingConnectionMock}
      config={config}
      iceServerConfigType={iceServerConfigType}
    />
  );
};

export default IncomingConnectionsAsyncContainer;
