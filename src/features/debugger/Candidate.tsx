import React from 'react';
import { css } from '@emotion/css';
import { Chip } from '@mui/material';

export interface CandidateProps {
  type: 'local' | 'remote';
  candidateType: 'host' | 'srflx' | 'prflx' | 'relay';
  ip: string;
  port: number;
  protocol: 'tcp' | 'udp';
}

export const Candidate: React.FC<CandidateProps> = ({
  type,
  ip,
  port,
  protocol,
  candidateType,
}: CandidateProps) => {
  return (
    <div
      className={css({
        display: 'flex',
        justifyContent: 'space-between',
      })}
    >
      <Chip
        label={`${
          type.split('-')[0]
        }: ${ip}:${port} ${protocol} ${candidateType}`}
      />
      <p>{`${type}: `}</p>
      <p>{`${ip}:${port} ${protocol} ${candidateType}`}</p>
    </div>
  );
};
export default Candidate;
