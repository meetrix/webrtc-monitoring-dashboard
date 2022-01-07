import { CandidateType, Report } from '@meetrix/webrtc-monitoring-common-lib';
import { Box, Card } from '@mui/material';
import React from 'react';
import DataCard from '../../components/DataCard';
import Tracks from './Tracks';

export type PeerComponentProps = {
  report: Report;
};

export const PeerComponent: React.FC<PeerComponentProps> = ({
  report: {
    peerId,
    data: { inbound, outbound, connection },
  },
}: PeerComponentProps) => {
  // eslint-disable-next-line no-bitwise
  const getKiliBytesFromBytes = (bytes: number) => bytes >> 10;
  const getCandidateString = ({
    ip,
    port,
    protocol,
    candidateType,
  }: CandidateType) => `${ip}:${port} ${protocol} ${candidateType}`;
  const connectionData = [
    {
      title: 'Connection',
      body: [
        { key: 'PeerId', value: `peerId: ${peerId}` },
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

  return (
    <>
      <Box
        sx={{
          maxWidth: '30%',
          display: 'flex',
          flexDirection: 'column',
          rowGap: '1rem',
        }}
      >
        <p>{`peerId: ${peerId}`}</p>
        <DataCard data={connectionData} />
        <Tracks tracks={inbound} type="inbound" />
        <Tracks tracks={outbound} type="outbound" />
      </Box>
    </>
  );
};

export default PeerComponent;
