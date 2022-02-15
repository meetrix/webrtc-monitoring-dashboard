import React from 'react';
import { Paper, Typography, Box, TypographyProps } from '@mui/material';
import { TimelineEvent } from '@peermetrics/webrtc-stats';

interface LogEntry extends TimelineEvent {
  key: string;
  peerId: any;
  timestamp: any;
}

interface LogEntryData {
  [datasetKey: string]: LogEntry;
}
interface DataSet {
  title: string;
  body: LogEntryData;
}

export interface LoggerComponentPropsType {
  data: DataSet[];
}

export const Logger: React.FC<LoggerComponentPropsType> = ({
  data,
}: LoggerComponentPropsType) => {
  const renderStringOrComponent = (
    stringOrComponent: string,
    props?: TypographyProps
  ) => {
    return typeof stringOrComponent === 'string' ? (
      <Typography variant="body2" {...props}>
        {stringOrComponent}
      </Typography>
    ) : (
      stringOrComponent
    );
  };

  return (
    <Paper>
      {data.map(({ title, body }) => {
        return (
          <Box
            key={title}
            sx={{
              padding: '1rem',
            }}
            rowGap="1rem"
          >
            {renderStringOrComponent(title, { variant: 'h6' })}
            {Object.values(body).map((row) => {
              return (
                <Box
                  key={row.key}
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: '200px 50px 200px 100px 1fr',
                    marginTop: '0.25rem',
                  }}
                >
                  {renderStringOrComponent(row.timestamp)}
                  {renderStringOrComponent(row.peerId)}
                  {renderStringOrComponent(row.event)}
                  {renderStringOrComponent(row.tag)}
                  {renderStringOrComponent(row.data)}
                </Box>
              );
            })}
          </Box>
        );
      })}
    </Paper>
  );
};

export default Logger;
