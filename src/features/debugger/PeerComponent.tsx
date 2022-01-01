import React from 'react';
import { Peer } from '@meetrix/webrtc-monitoring-common-lib';
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';
import { Chip, Grid } from '@mui/material';
import { css } from '@emotion/css';
import Candidate from './Candidate';

export type PeerComponentProps = {
  peer: Peer;
};

export const PeerComponent: React.FC<PeerComponentProps> = ({
  peer: { peerId, inbound, outbound, connection },
}: PeerComponentProps) => {
  // eslint-disable-next-line no-bitwise
  const getKiliBytesFromBytes = (bytes: number) => bytes >> 10;

  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: '0.2rem',
      })}
    >
      <p>{`peerId: ${peerId}`}</p>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Chip
            icon={<ArrowUpward />}
            label={`${getKiliBytesFromBytes(connection.bytesSent)} KB`}
          />
        </Grid>
        <Grid item xs={4}>
          <Chip
            icon={<ArrowDownward />}
            label={`${getKiliBytesFromBytes(connection.bytesReceived)} KB`}
          />
        </Grid>
      </Grid>

      <Candidate {...connection.local} />
      <Candidate {...connection.remote} />
    </div>
  );
};

export default PeerComponent;
