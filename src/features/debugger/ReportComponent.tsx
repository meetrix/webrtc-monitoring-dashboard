import {
  CandidateType,
  Connection,
  Other,
  Report,
} from '@meetrix/webrtc-monitoring-common-lib';
import { Box, Card } from '@mui/material';
import React, { useRef } from 'react';
import DataCard from '../../components/DataCard';
import Logger from '../../components/Logger';
import Tracks from './Tracks';

export type PeerComponentProps = {
  report: Report;
  connectionStatus: Connection;
  otherInfo: Other;
};

interface LogEntry {
  key: string;
  peerId: string;
  timestamp: string;
  event: string;
  tag: string;
  logData: any;
}

interface LogEntryData {
  [datasetKey: string]: LogEntry;
}

export const PeerComponent: React.FC<PeerComponentProps> = ({
  report: {
    peerId,
    data: { inbound, outbound, connection, browserInfo, mediaDeviceInfo },
  },
  report,
  connectionStatus,
  otherInfo,
}: PeerComponentProps) => {
  // eslint-disable-next-line no-bitwise
  const getKiliBytesFromBytes = (bytes: number) => bytes >> 10;

  const getCandidateString = ({
    ip,
    port,
    protocol,
    candidateType,
  }: CandidateType) => `${ip}:${port} ${protocol} ${candidateType}`;

  const getMediaDeviceInfo = () => {
    return mediaDeviceInfo.map((mediaDevice) => {
      return {
        key: `(${mediaDevice.kind}) ${mediaDevice.deviceId}`,
        value: mediaDevice.label,
      };
    });
  };

  const log = useRef<LogEntryData>({
    init: {
      key: 'init',
      timestamp: 'timestamp',
      peerId: 'peerId',
      event: 'event',
      tag: 'tag',
      logData: 'logData',
    },
  });
  const getConnectionLog = () => {
    log.current[JSON.stringify(otherInfo)] = {
      key: JSON.stringify(otherInfo) || '',
      timestamp: otherInfo.timestamp || '',
      peerId: otherInfo.peerId || '',
      event: otherInfo.event || '',
      tag: otherInfo.tag || '',
      logData: JSON.stringify(otherInfo.data) || '',
    };
    log.current[JSON.stringify(connectionStatus)] = {
      key: JSON.stringify(connectionStatus) || '',
      timestamp: connectionStatus.timestamp || '',
      peerId: connectionStatus.peerId || '',
      event: connectionStatus.event || '',
      tag: connectionStatus.tag || '',
      logData: JSON.stringify(connectionStatus.data) || '',
    };
    log.current[JSON.stringify(report)] = {
      key: JSON.stringify(report) || '',
      timestamp: report.timestamp || '',
      peerId: report.peerId || '',
      event: report.event || '',
      tag: report.tag || '',
      logData: JSON.stringify(report.data) || '',
    };

    return log.current;
  };

  const statsData = [
    {
      title: 'Stats',
      body: [
        { key: 'PeerId', value: peerId },
        {
          key: 'Sent',
          value: `${getKiliBytesFromBytes(connection.bytesSent)} KB`,
        },
        {
          key: 'Received',
          value: `${getKiliBytesFromBytes(connection.bytesReceived)} KB`,
        },
        {
          key: 'Local candidate',
          value: getCandidateString(connection.local || {}),
        },
        {
          key: 'Remote candidate',
          value: getCandidateString(connection.remote || {}),
        },
      ],
    },
  ];

  const BrowserData = [
    {
      title: 'Browser Data',
      body: [
        {
          key: 'UserAgent',
          value: browserInfo.userAgent || '',
        },
        {
          key: 'platform',
          value: browserInfo.platform || '',
        },
      ],
    },
  ];

  const mediaDeviceInfoData = [
    {
      title: 'Media Device Info',
      body: getMediaDeviceInfo(),
    },
  ];

  const connectionData = [
    {
      title: 'Connection',
      body: [
        {
          key: 'Status',
          value: connectionStatus.data || '',
        },
      ],
    },
  ];

  const otherInfoData = [
    {
      title: 'Connection log',
      body: getConnectionLog(),
    },
  ];
  // console.log('otherInfoData', otherInfoData);

  return (
    <>
      <Box
        sx={{
          maxWidth: '50%',
          display: 'flex',
          flexDirection: 'column',
          rowGap: '1rem',
        }}
      >
        {/* <p>{`peerId: ${peerId}`}</p> */}
        <DataCard data={connectionData} />
        <DataCard data={BrowserData} />
        <DataCard data={mediaDeviceInfoData} />
        <DataCard data={statsData} />
        <Tracks tracks={inbound} type="inbound" />
        <Tracks tracks={outbound} type="outbound" />
        <Logger data={otherInfoData} />
      </Box>
    </>
  );
};

export default PeerComponent;
