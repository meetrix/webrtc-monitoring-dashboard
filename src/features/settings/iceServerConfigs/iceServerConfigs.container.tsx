/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-empty-interface */
import React from 'react';
import ICEServerConfigs from './iceServerConfigs.view';
import {
  setSettingsPage,
  iceServerConfigGetAsync,
  selectConfig,
  iceServerConfigSetAsync,
} from '../settings.slice';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';

export interface ISettingsAsyncContainer {}

const SettingsAsyncContainer: React.FC<ISettingsAsyncContainer> = ({}: ISettingsAsyncContainer) => {
  const dispatch = useAppDispatch();
  const iceServerConfig = useAppSelector(selectConfig);
  const {
    config,
    iceServerConfigType,
    selectedDomain,
    token,
    isServerSettingsPage,
  } = iceServerConfig;

  return (
    <ICEServerConfigs
      actions={{
        getICEServerConfig: (data: any) => {
          dispatch<any>(iceServerConfigGetAsync(data));
        },
        setIsServerSettingsPage: (data: any) => {
          dispatch<any>(setSettingsPage(data));
        },
        setICEServerConfig: (data: any) => {
          dispatch<any>(iceServerConfigSetAsync(data));
        },
      }}
      config={config}
      iceServerConfigType={iceServerConfigType}
      selectedDomain={selectedDomain}
      token={token}
      isServerSettingsPage={isServerSettingsPage}
    />
  );
};

export default SettingsAsyncContainer;
