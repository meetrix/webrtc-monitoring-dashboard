import React from 'react';
import { Paper, Typography, Box, TypographyProps } from '@mui/material';
import { TimelineEvent } from '@peermetrics/webrtc-stats';
import JsonTreeView from './JsonTreeView';

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
  columns: string[];
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
      {data.map(({ title, columns, body }) => {
        return (
          <Box
            key={title}
            sx={{
              padding: '1rem',
            }}
            rowGap="1rem"
          >
            {renderStringOrComponent(title, { variant: 'h6' })}
            <Box
              key="columns"
              sx={{
                display: 'grid',
                gridTemplateColumns: '200px 50px 200px 100px 1fr',
                marginTop: '0.25rem',
              }}
            >
              {renderStringOrComponent(columns[0])}
              {renderStringOrComponent(columns[1])}
              {renderStringOrComponent(columns[2])}
              {renderStringOrComponent(columns[3])}
              {renderStringOrComponent(columns[4])}
            </Box>
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
                  <JsonTreeView
                    treeItems={row.data ? JSON.parse(row.data) : ''}
                  />
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
