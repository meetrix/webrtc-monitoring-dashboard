import { CandidateType, Report } from '@meetrix/webrtc-monitoring-common-lib';
import { Box, Typography } from '@mui/material';
import { TimelineEvent } from '@peermetrics/webrtc-stats';
import React, { useRef } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DownloadIcon from '@mui/icons-material/Download';
import IconButton from '@mui/material/IconButton';

export type SdpComponentProps = {
  report: Report;
};

export const SdpComponent: React.FC<SdpComponentProps> = ({
  report: {
    data: { sdp },
  },
}: SdpComponentProps) => {
  return (
    <Box
      sx={{
        borderRadius: 1,
        border: '1px solid #dadada',
        maxHeight: '100%',
        marginTop: '10px',
        overflow: 'auto',
      }}
    >
      <Box
        sx={{
          backgroundColor: '#F6F9FB',
          textAlign: 'right',
          p: '8px',
          position: 'sticky',
          top: 0,
          left: 0,
          right: 0,
        }}
      >
        <IconButton id="download-button">
          <DownloadIcon fontSize="small" />
        </IconButton>
        <IconButton id="copy-button">
          <ContentCopyIcon fontSize="small" />
        </IconButton>
      </Box>
      <Box
        sx={{
          p: 1,
          width: '300vw',
        }}
      >
        {sdp.map((data: any, index: any) => (
          <Typography variant="body2" color="gray" fontFamily="monospace">
            {`${index} : ${data}`}
          </Typography>
        ))}
      </Box>
    </Box>
  );
};

export default SdpComponent;
