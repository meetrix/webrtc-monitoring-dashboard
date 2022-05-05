import { CandidateType, Report } from '@meetrix/webrtc-monitoring-common-lib';
import { Box } from '@mui/material';
import { TimelineEvent } from '@peermetrics/webrtc-stats';
import React, { useRef } from 'react';
import DataCard from '../../../components/DataCard';
import Logger from '../../../components/Logger';

export type GeneralLogsProps = {
  report: Report;
  connectionStatus: TimelineEvent;
  otherInfo: TimelineEvent;
  mediaInfo: TimelineEvent;
};

interface LogEntry extends TimelineEvent {
  key: string;
  peerId: any;
  timestamp: any;
  tag: any;
}

interface LogEntryData {
  [datasetKey: string]: LogEntry;
}

export const GeneralLogs: React.FC<GeneralLogsProps> = ({
  report: {
    peerId,
    data: { inbound, outbound, connection, basicInformation },
  },
  report,
  connectionStatus,
  otherInfo,
  mediaInfo: {
    data: { browserInfo, mediaDeviceInfo },
  },
}: GeneralLogsProps) => {
  // eslint-disable-next-line no-bitwise
  const getKiliBytesFromBytes = (bytes: number) => bytes >> 10;

  const getCandidateString = ({
    ip,
    port,
    protocol,
    candidateType,
  }: CandidateType) => `${ip}:${port}`;

  const getMediaDeviceInfo = () => {
    return mediaDeviceInfo.map((mediaDevice: MediaDeviceInfo) => {
      return {
        key: mediaDevice.kind,
        value: mediaDevice.label,
      };
    });
  };

  const log = useRef<LogEntryData>({});

  const getConnectionLog = () => {
    log.current[JSON.stringify(otherInfo)] = {
      key: JSON.stringify(otherInfo) || '',
      timestamp: otherInfo.timestamp || '',
      peerId: otherInfo.peerId || '',
      event: otherInfo.event || '',
      tag: otherInfo.tag || '',
      data: JSON.stringify(otherInfo.data) || '',
    };
    log.current[JSON.stringify(connectionStatus)] = {
      key: JSON.stringify(connectionStatus) || '',
      timestamp: connectionStatus.timestamp || '',
      peerId: connectionStatus.peerId || '',
      event: connectionStatus.event || '',
      tag: connectionStatus.tag || '',
      data: JSON.stringify(connectionStatus.data) || '',
    };
    log.current[JSON.stringify(report)] = {
      key: JSON.stringify(report) || '',
      timestamp: report.timestamp || '',
      peerId: report.peerId || '',
      event: report.event || '',
      tag: report.tag || '',
      data: JSON.stringify(report.data) || '',
    };

    return log.current;
  };

  const basicInfoData = [
    {
      event: 'BASIC INFORMATION',
      body: [
        {
          key: 'Client ID',
          value: basicInformation.clientId || '',
        },
        {
          key: 'Operating system',
          value: basicInformation.os || '',
        },
        {
          key: 'Browser',
          value: basicInformation.browser || '',
        },
        {
          key: 'Browser Version',
          value: basicInformation.browserVersion || '',
        },
        {
          key: 'Connected At',
          value: basicInformation.connectedAt || '',
        },
      ],
    },
  ];

  const connectionData = [
    {
      event: 'CONNECTION',
      body: [
        {
          key: 'Status',
          value: connection.state || '',
        },
        {
          key: 'Peer Connection',
          value: peerId || '',
        },
        {
          key: 'Bytes Sent',
          value: `${getKiliBytesFromBytes(connection.bytesSent)} KB`,
        },
        {
          key: 'Bytes Received',
          value: `${getKiliBytesFromBytes(connection.bytesReceived)} KB`,
        },
        {
          key: 'Jitter',
          value: '0',
        },
        {
          key: 'Packet Lost',
          value:
            JSON.stringify(
              connection.packetsSent - connection.packetsReceived
            ) || '',
        },
        {
          key: 'Local Ip',
          value: getCandidateString(connection.local || {}),
        },
        {
          key: 'Remote Ip',
          value: getCandidateString(connection.remote || {}),
        },
      ],
    },
  ];

  const BrowserData = [
    {
      event: 'Browser Data',
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
      event: 'Media Device Info',
      body: getMediaDeviceInfo(),
    },
  ];

  return (
    <>
      <Box>
        <Box
          sx={{
            display: 'flex',
            gap: '16px',
            marginTop: '16px',
          }}
        >
          <DataCard data={basicInfoData} />
          <DataCard data={mediaDeviceInfoData} />
          <DataCard data={connectionData} />
        </Box>
        {/* <Box
          sx={{
            display: 'flex',
            gap: 16,
            marginTop: 16,
          }}
        >
          <DataCard tableData={inbound} />
          <DataCard tableData={outbound} />
        </Box> */}
      </Box>
    </>
  );
};

export default GeneralLogs;
